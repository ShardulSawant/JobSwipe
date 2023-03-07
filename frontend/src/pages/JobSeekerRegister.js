import React from "react";
import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import { FormRow, FormRowSelect } from "../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginJobSeeker,
  registerJobSeeker,
} from "../features/jobSeeker/jobSeekerslice";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  jobSeekerCity: "",
  jobSeekerCountry: "",
  jobType: "",
  jobTypeOptions: ["Full time", "part time", "Limited Contract"],
  language: "",
  levelOptions: ["A1", "A2", "B1", "B2"],
  workExperience: "",
  skills: [],
  certification: [],
};

const JobSeekerRegister = () => {
  const [values, setValues] = useState(initialState);

  const [skill, setSkill] = useState("");
  const [certification, setcertification] = useState([]);

  const { jobSeeker, isLoading } = useSelector((store) => store.jobSeeker);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    //if (!email || !password || (isMember && !name)) {
    if (!email || !password) {
      toast.error("Please fill out all the fields");
      return;
    }
    console.log("reached on submit method");
    if (isMember) {
      dispatch(loginJobSeeker({ email: email, password: password }));
      return;
    }
    //dispatch(
    //registerJobSeeker({ name: name, email: email, password: password })
    //);
  };

  useEffect(() => {
    if (jobSeeker) {
      setTimeout(() => {
        navigate("/JobSeeker");
      }, 2000);
    }
  }, [jobSeeker]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {/* <Logo></Logo> */}
        <h3>
          {values.isMember ? " Job Seeker Login" : " Job Seeker Register"}
        </h3>
        <div className="form-center">
          {/* name field */}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              labelText="Name"
              value={values.name}
              handleChange={handleChange}></FormRow>
          )}
          {/* Email field */}
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            value={values.email}
            handleChange={handleChange}></FormRow>
          {/* Password field */}
          <FormRow
            type="password"
            name="password"
            labelText="Password"
            value={values.password}
            handleChange={handleChange}
            disabled={isLoading}></FormRow>
          {/* {!values.isMember && (
            <FormRow
              type="text"
              name="jobSeekerCity"
              labelText="City"
              value={values.jobSeekerCity}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="jobSeekerCountry"
              labelText="Country"
              value={values.jobSeekerCountry}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )}
          {!values.isMember && (
            <FormRowSelect
              type="text"
              labelText="Type"
              name="jobType"
              value={values.jobType}
              handleChange={handleChange}
              list={values.jobTypeOptions}></FormRowSelect>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="workExperience"
              labelText="Work Experience"
              value={values.workExperience}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="skill1"
              labelText="Skill 1"
              value={skill}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="skill2"
              labelText="Skill 2"
              value={skill}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="skill3"
              labelText="Skill 3"
              value={skill}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="certification1"
              labelText="Certification 1"
              value={certification}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )}
          {!values.isMember && (
            <FormRow
              type="text"
              name="certification2"
              labelText="Certification 2"
              value={certification}
              handleChange={handleChange}
              disabled={isLoading}></FormRow>
          )} */}
          <button type="submit" className="btn btn-block">
            Submit
          </button>
          <p>
            {values.isMember ? "Not a member yet ?" : "ALready a member ?"}
            <button className="btn-toggle" onClick={toggleMember}>
              {!values.isMember ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default JobSeekerRegister;
