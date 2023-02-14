import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const JobSeekerProtectedRoute = ({ children }) => {
  const { jobSeeker } = useSelector((store) => store.jobSeeker);
  if (!jobSeeker) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default JobSeekerProtectedRoute;
