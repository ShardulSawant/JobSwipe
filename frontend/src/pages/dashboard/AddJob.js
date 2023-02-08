import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, FormRowTextArea } from "../../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";

const AddJob = () => {
  const {
    isLoading,
    company,
    position,
    statusOptions,
    status,
    jobCity,
    jobCountry,
    salary,
    jobDescription,
    jobProfile,
    jobTypeOptions,
    jobType,
    jobModeOptions,
    jobMode,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !position ||
      !jobCity ||
      !jobCountry ||
      !salary ||
      !jobDescription ||
      !jobProfile
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            company,
            position,
            jobCity,
            jobCountry,
            jobDescription,
            status,
            jobMode,
            jobType,
            jobProfile,
            salary,
          },
        })
      );
      return;
    }
    dispatch(
      createJob({
        company,
        position,
        jobCity,
        jobCountry,
        jobDescription,
        status,
        jobMode,
        jobType,
        jobProfile,
        salary,
      })
    );
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    dispatch(handleChange({ name, value }));
  };

  const handleClearValues = (e) => {
    dispatch(clearValues());
  };

  useEffect(() => {
    dispatch(handleChange({ name: "company", value: user.name }));
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Position"
            name="position"
            value={position}
            handleChange={handleJobInput}></FormRow>
          <FormRow
            type="text"
            labelText="Company"
            name="company"
            value={company}
            handleChange={handleJobInput}></FormRow>
          <FormRowSelect
            labelText="Status"
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}></FormRowSelect>
          <FormRowSelect
            labelText="Mode"
            name="jobMode"
            value={jobMode}
            handleChange={handleJobInput}
            list={jobModeOptions}></FormRowSelect>
          <FormRowSelect
            labelText="Type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}></FormRowSelect>
          <FormRow
            type="text"
            labelText="City"
            name="jobCity"
            value={jobCity}
            handleChange={handleJobInput}></FormRow>
          <FormRow
            type="text"
            labelText="Country"
            name="jobCountry"
            value={jobCountry}
            handleChange={handleJobInput}></FormRow>
          <FormRowTextArea
            type="textarea"
            labelText="Description"
            name="jobDescription"
            value={jobDescription}
            handleChange={handleJobInput}></FormRowTextArea>
          <FormRowTextArea
            type="textarea"
            labelText="Candidate Profile"
            name="jobProfile"
            value={jobProfile}
            handleChange={handleJobInput}></FormRowTextArea>
          <FormRow
            type="text"
            labelText="Salary range"
            name="salary"
            value={salary}
            handleChange={handleJobInput}></FormRow>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={handleClearValues}>
              Clear fields
            </button>
            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}>
              {isLoading ? "Please Wait..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
