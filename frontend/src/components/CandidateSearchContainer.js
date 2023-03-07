import React from "react";
import { FormRow, FormRowSelect } from ".";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
  getAllJobPositions,
} from "../features/Candidatelist/candidateAppliedlist";
import Wrapper from "../assets/wrappers/SearchContainer";
import customFetch from "../utils/axios";
import { useState, useEffect } from "react";
import FormRowSelectPosition from "./FormRowSelectPosition";

const CandidateSearchContainer = () => {
  const { jobPositionOptions } = useSelector((store) => store.allCandidates);
  //const [jobPositionOptions, setJobPositionOptions] = useState([]);

  const { isLoading, search, jobPosition } = useSelector(
    (store) => store.allCandidates
  );

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(clearFilters());
  // };

  useEffect(() => {
    dispatch(getAllJobPositions());
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Candidate</h4>
        <div className="form-center">
          {/* <FormRow
            labelText="Search"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          /> */}
          <FormRowSelectPosition
            labelText="Job Positions"
            name="jobPosition"
            value={jobPosition}
            handleChange={handleSearch}
            list={jobPositionOptions}
          />
          {/* <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}>
            clear filters
          </button> */}
        </div>
      </form>
    </Wrapper>
  );
};

export default CandidateSearchContainer;
