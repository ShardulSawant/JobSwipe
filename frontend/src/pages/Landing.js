import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo></Logo>
      </nav>
      <div className="container page">
        <div className="info">
          <p>
            Welcome to JobSwipe - the new and exciting way to find your dream
            job! We've combined the convenience of a job portal with the
            intuitive swiping functionality of Tinder to make your job search
            more efficient and enjoyable. Simply right-swipe to apply for a job,
            and left-swipe to reject. No more submitting countless resumes and
            cover letters - let JobSwipe do the work for you! Start swiping and
            find your next career move today.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img className="img main-img" src={main} alt=""></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
