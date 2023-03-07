import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const Certification = ({ icon, Certification }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">
        <div>
          <p>Certification: {Certification.join(", ")}</p>
        </div>
      </span>
    </Wrapper>
  );
};

export default Certification;
