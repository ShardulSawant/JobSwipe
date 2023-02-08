import React from "react";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { AiOutlineDesktop } from "react-icons/ai";
import { GoLocation, GoTasklist } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";
import JobInfo from "./JobInfo";
import moment from "moment";
import { deleteJob, setEditJob } from "../features/job/jobSlice";

const Job = ({
  _id,
  position,
  status,
  jobCity,
  jobCountry,
  salary,
  jobDescription,
  jobProfile,
  jobType,
  jobMode,
  createdAt,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{String(position).charAt(0)}</div>
        <div className="info content-center">
          <h5>{position}</h5>
          <div className={`status ${status}`}>{status}</div>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo
            icon={<FaLocationArrow></FaLocationArrow>}
            text={jobCity}></JobInfo>
          <JobInfo icon={<GoLocation></GoLocation>} text={jobCountry}></JobInfo>
          <JobInfo icon={<FaCalendarAlt></FaCalendarAlt>} text={date}></JobInfo>
          <JobInfo icon={<FaBriefcase></FaBriefcase>} text={jobType}></JobInfo>
          <JobInfo
            icon={<GoTasklist></GoTasklist>}
            text={jobDescription}></JobInfo>
          <JobInfo icon={<ImProfile></ImProfile>} text={jobProfile}></JobInfo>
          <JobInfo
            icon={<FaMoneyBillWave></FaMoneyBillWave>}
            text={salary}></JobInfo>
          <JobInfo
            icon={<AiOutlineDesktop></AiOutlineDesktop>}
            text={jobMode}></JobInfo>
        </div>
        <footer>
          <div className="actions content-center">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    status,
                    jobCity,
                    jobCountry,
                    salary,
                    jobDescription,
                    jobProfile,
                    jobType,
                    jobMode,
                  })
                );
              }}>
              Edit
            </Link>
            <button
              type="buttom"
              className="btn delete-btn"
              onClick={() => {
                dispatch(deleteJob(_id));
              }}>
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
