import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import JobSeekerNavLinks from "./JobSeekerNavLinks";

const JobSeekerBigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }>
        <div className="content">
          <header>
            <Logo></Logo>
          </header>
          <JobSeekerNavLinks></JobSeekerNavLinks>
        </div>
      </div>
    </Wrapper>
  );
};

export default JobSeekerBigSidebar;
