import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Landing,
  Error,
  Register,
  ProtectedRoute,
  JobSeekerRegister,
  JobSeekerProtectedRoute,
} from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Profile,
  AllJobs,
  Stats,
  AddJob,
  SharedLayout,
} from "./pages/dashboard/index";

import {
  JobSeekerSharedLayout,
  JobSeekerProfile,
  JobSwipe,
} from "./pages/jobSeekerDashboard/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/jobSeeker"
          element={
            <JobSeekerProtectedRoute>
              <JobSeekerSharedLayout />
            </JobSeekerProtectedRoute>
          }>
          <Route index element={<JobSwipe />} />
          <Route path="jobseeker-profile" element={<JobSeekerProfile />} />
        </Route>
        <Route path="landing" element={<Landing></Landing>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route
          path="JobSeekerRegister"
          element={<JobSeekerRegister></JobSeekerRegister>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
}

export default App;
