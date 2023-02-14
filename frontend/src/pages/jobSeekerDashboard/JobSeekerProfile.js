import React from "react";
import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const JobSeekerProfile = () => {
  const { isLoading, jobSeeker } = useSelector((store) => store.jobSeeker);
  const disptach = useDispatch();

  const [jobSeekerData, setUserData] = useState({
    name: jobSeeker?.name || "",
    email: jobSeeker?.email || "",
    jobSeekerCity: jobSeeker?.jobSeekerCity || "",
    jobSeekerCountry: jobSeeker.jobSeekerCountry || "",
    jobType: jobSeeker.jobType || "Full time",
    languages: jobSeeker.languages,
    workExperience: jobSeeker.workExperience || "",
    skills: jobSeeker.skills,
    certification: jobSeeker.certification || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      email,
      jobSeekerCity,
      jobSeekerCountry,
      languages,
      workExperience,
      skills,
      certification,
    } = jobSeekerData;
    if (
      !name ||
      !email ||
      !jobSeekerCity ||
      !jobSeekerCountry ||
      !workExperience ||
      !skills ||
      !certification ||
      !languages
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    //disptach(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    console.log(name);
    const value = e.target.value;
    console.log(value);
    setUserData({ ...jobSeekerData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Candidate Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Name"
            name="name"
            value={jobSeekerData.name}
            handleChange={handleChange}></FormRow>
          <FormRow
            type="email"
            labelText="Email"
            name="email"
            value={jobSeekerData.email}
            handleChange={handleChange}></FormRow>
          <FormRow
            type="text"
            labelText="City"
            name="jobSeekerCity"
            value={jobSeekerData.jobSeekerCity}
            handleChange={handleChange}></FormRow>
          <FormRow
            type="text"
            labelText="Country"
            name="jobSeekerCountry"
            value={jobSeekerData.jobSeekerCountry}
            handleChange={handleChange}></FormRow>
          <FormRow
            type="text"
            labelText="Work Experience"
            name="workExperience"
            value={jobSeekerData.workExperience}
            handleChange={handleChange}></FormRow>
          <FormRow
            type="text"
            labelText="certification"
            name="certification"
            value={jobSeekerData.certification}
            handleChange={handleChange}></FormRow>
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Update user"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default JobSeekerProfile;
