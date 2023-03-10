import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  logoutJobSeeker,
} from "../features/jobSeeker/jobSeekerslice";

const JobSeekerNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { jobSeeker } = useSelector((store) => store.jobSeeker);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft></FaAlignLeft>
        </button>
        <div>
          <Logo></Logo>
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {jobSeeker?.name}
            <FaCaretDown></FaCaretDown>
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutJobSeeker("Logging out..."))}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default JobSeekerNavbar;
