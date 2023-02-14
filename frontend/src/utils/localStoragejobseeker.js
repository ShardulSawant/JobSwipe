export const addJobSeekertoLocalStorage = (jobSeeker) => {
  localStorage.setItem("jobSeeker", JSON.stringify(jobSeeker));
};

export const removeJobSeekerFromLocalStorage = () => {
  localStorage.removeItem("jobSeeker");
};

export const getJobSeekerFromLocalStorage = () => {
  const result = localStorage.getItem("jobsSeeker");
  const jobSeeker = result ? JSON.parse(result) : null;
  return jobSeeker;
};
