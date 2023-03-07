import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import { Loading } from "./Loading";
import { getallCandidates } from "../features/Candidatelist/candidateAppliedlist";
import PageBtnContainer from "./PageBtnContainer";
import Candidate from "./Candidate";

const CandidateContainer = () => {
  const {
    candidateList,
    isLoading,
    page,
    totalCandidates,
    numOfPages,
    jobPosition,
  } = useSelector((store) => store.allCandidates);
  let candidateId = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallCandidates());
  }, [page, jobPosition]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Wrapper>
      <h5>{totalCandidates} Candidates</h5>
      <div className="jobs">
        {candidateList.map((obj) => {
          console.log(obj);
          let candidateArray = obj;
          return candidateArray.map((candidate) => {
            return <Candidate key={candidate._id} {...candidate} />;
          });
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default CandidateContainer;
