import React from "react";
import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/users/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const disptach = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, location } = userData;
    if (!name || !email || !location) {
      toast.error("Please fill out all fields");
      return;
    }
    disptach(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    console.log(name);
    const value = e.target.value;
    console.log(value);
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Company Name"
            name="name"
            value={userData.name}
            handleChange={handleChange}></FormRow>
          <FormRow
            type="email"
            labelText="Company Email"
            name="email"
            value={userData.email}
            handleChange={handleChange}></FormRow>
          <FormRow
            type="text"
            labelText="Company Location"
            name="location"
            value={userData.location}
            handleChange={handleChange}></FormRow>
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Update user"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
