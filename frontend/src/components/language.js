import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const Language = ({ icon, languages }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">
        <div>Languages : </div>
      </span>
      <span className="text">
        {languages.map((lang, index) => (
          <div key={index}>
            <div>
              {lang.language} : {lang.level}
            </div>
          </div>
        ))}
      </span>
    </Wrapper>
  );
};

export default Language;
