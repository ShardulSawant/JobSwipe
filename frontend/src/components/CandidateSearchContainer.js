import React from "react";
import { FormRow, FormRowSelect } from ".";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
} from "../features/Candidatelist/candidateAppliedlist";
import Wrapper from "../assets/wrappers/SearchContainer";
import customFetch from "../utils/axios";
import { useState, useEffect } from "react";

const CandidateSearchContainer = () => {
  let allJobPosition;
  const { user } = useSelector((store) => store.user);
  const [jobPositionOptions, setJobPositionOptions] = useState([]);

  const { isLoading, search, jobPosition } = useSelector(
    (store) => store.allCandidates
  );

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  useEffect(() => {
    customFetch
      .get("/jobs/jobPositons", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        allJobPosition = response.data.jobPositions;
        setJobPositionOptions(allJobPosition.map((obj) => obj.position));
      });
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Candidate</h4>
        <div className="form-center">
          <FormRow
            labelText="Search"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText="Job Positions"
            name="jobPositions"
            value={jobPosition}
            handleChange={handleSearch}
            list={jobPositionOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default CandidateSearchContainer;
