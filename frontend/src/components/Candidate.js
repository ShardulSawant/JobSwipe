import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { FaLocationArrow, FaBriefcase } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { HiTranslate } from "react-icons/hi";
import { HiAcademicCap } from "react-icons/hi";
import { MdMarkAsUnread } from "react-icons/md";

import Wrapper from "../assets/wrappers/Job";
import Language from "./language";
import Education from "./education";
import Skills from "./Skills";
import Certification from "./certification";
import CandidateInfo from "./CandidateInfo";
import {
  postRejectCandidate,
  postShortlistCandidate,
} from "../features/Candidatelist/candidateAppliedlist";

const Candidate = ({
  _id,
  name,
  email,
  jobSeekerCity,
  jobSeekerCountry,
  jobType,
  languages,
  workExperience,
  skills,
  education,
  certification,
}) => {
  const dispatch = useDispatch();
  const { jobPosition } = useSelector((store) => store.allCandidates);

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{}</div>
        <div className="info content-center">
          <h5>{name}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <CandidateInfo
            icon={<FaLocationArrow></FaLocationArrow>}
            label="City"
            text={jobSeekerCity}></CandidateInfo>
          <CandidateInfo
            icon={<GoLocation></GoLocation>}
            label="Country"
            text={jobSeekerCountry}></CandidateInfo>
          <CandidateInfo
            icon={<FaBriefcase></FaBriefcase>}
            label="Job Type"
            text={jobType}></CandidateInfo>
          <CandidateInfo
            icon={<MdMarkAsUnread></MdMarkAsUnread>}
            label="Email"
            text={email}></CandidateInfo>
          <Skills
            icon={<HiAcademicCap></HiAcademicCap>}
            Skills={skills}></Skills>
          <Language
            icon={<HiTranslate></HiTranslate>}
            languages={languages}></Language>
          <CandidateInfo
            icon={<ImProfile></ImProfile>}
            label="Work Experience"
            text={workExperience}></CandidateInfo>
          <Education
            icon={<HiAcademicCap></HiAcademicCap>}
            education={education}></Education>
          <Certification
            icon={<HiAcademicCap></HiAcademicCap>}
            Certification={certification}></Certification>
        </div>
        <footer>
          <div className="actions content-center">
            <button
              className="btn edit-btn"
              onClick={() => {
                dispatch(
                  postShortlistCandidate({
                    jobSeekerId: _id,
                  })
                );
                console.log(jobPosition);
              }}>
              Shorlist candidate
            </button>
            <button
              type="buttom"
              className="btn delete-btn"
              onClick={() => {
                dispatch(
                  postRejectCandidate({
                    jobSeekerId: _id,
                  })
                );
              }}>
              Reject candidate
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Candidate;
