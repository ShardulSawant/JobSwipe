import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const CandidateInfo = ({ icon, text, label }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">
        {label} : {text}
      </span>
    </Wrapper>
  );
};

export default CandidateInfo;
