import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const education = ({ icon, education }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">
        <div>Education: </div>
      </span>
      <span className="text">
        {education.map((edu, index) => (
          <div key={index}>
            <div>
              {edu.degree} in {edu.fieldOfStudy}
            </div>
          </div>
        ))}
      </span>
    </Wrapper>
  );
};

export default education;
