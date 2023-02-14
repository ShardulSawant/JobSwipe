import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import {
  JobSeekerBigSidebar,
  JobSeekerNavbar,
  SmallSidebar,
} from "../../components";

const JobSeekerSharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar></SmallSidebar>
        <JobSeekerBigSidebar></JobSeekerBigSidebar>
        <div>
          <JobSeekerNavbar></JobSeekerNavbar>
          <div className="dashboard-page">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default JobSeekerSharedLayout;
