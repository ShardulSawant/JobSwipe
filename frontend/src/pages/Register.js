import React from "react";
import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
//import { Logo } from "../components/index";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    //if (!email || !password || (isMember && !name)) {
    if (!email || !password) {
      toast.error("Please fill out all the fields");
      return;
    }
    console.log("reached on submit method");
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name: name, email: email, password: password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {/* <Logo></Logo> */}
        <h3>{values.isMember ? " Company Login" : " Company Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            labelText="Company name"
            value={values.name}
            handleChange={handleChange}></FormRow>
        )}
        {/* Email field */}
        <FormRow
          type="email"
          name="email"
          labelText="Company email"
          value={values.email}
          handleChange={handleChange}></FormRow>
        {/* Password field */}
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          value={values.password}
          handleChange={handleChange}></FormRow>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet ?" : "ALready a member ?"}
          <button className="btn-toggle" onClick={toggleMember}>
            {!values.isMember ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
