import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const Skills = ({ icon, Skills }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">
        <div>
          <p>Skills: {Skills.join(", ")}</p>
        </div>
      </span>
    </Wrapper>
  );
};

export default Skills;
