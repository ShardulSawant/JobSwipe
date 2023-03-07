/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "../../assets/css/JobSwipe.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
//import { getSuggestJobs } from "../../features/jobsSuggest/jobSuggest";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const JobSwipe = () => {
  const { jobSeeker } = useSelector((store) => store.jobSeeker);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(true);
  const [isToggled2, setIsToggled2] = useState(true);
  const [showCard, setshowCard] = useState(true);
  const [oncount, setOncount] = useState(0);

  var firstData;

  setTimeout(() => {
    setIsToggled(false);
  }, 1000);

  setTimeout(() => {
    setIsToggled2(false);
  }, 1000);

  useEffect(() => {
    customFetch
      .get("/jobSeeker/jobSuggestion", {
        headers: {
          authorization: `Bearer ${jobSeeker.token}`,
        },
      })
      .then((response) => {
        firstData = response.data.jobs;
        console.log(firstData);
        setAllData(response.data.jobs);
        showfirstprofile();
      })
      .catch((response) => {
        setshowCard(false);
        toast.error("No Jobs found for user");
      });
  }, []);

  function showfirstprofile() {
    console.log("show first profile function");
    if (oncount < firstData.length) {
      setOncount(oncount + 1);
      setData(firstData[oncount]);
    }
  }

  function showprofile() {
    if (oncount < allData.length) {
      setData(allData[oncount]);
    } else {
      setshowCard(false);
      toast.error("All jobs caught up");
    }
  }

  const handlelikebutton = () => {
    try {
      setIsToggled(!isToggled);
      showprofile();
      setOncount(oncount + 1);
      const jobId = { jobId: data._id };

      customFetch
        .post("/jobSeeker/jobSeekerLiked", jobId, {
          headers: {
            authorization: `Bearer ${jobSeeker.token}`,
          },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // dislike button woking

  const handleDislikeButton = () => {
    try {
      setIsToggled2(!isToggled2);
      showprofile();
      setOncount(oncount + 1);
      const jobId = { jobId: data._id };
      customFetch
        .post("/jobSeeker/jobSeekerDisliked", jobId, {
          headers: {
            authorization: `Bearer ${jobSeeker.token}`,
          },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Suggestions">
      {showCard && (
        <motion.div
          id="card_div"
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout
          onClick={() => setIsOpen(!isOpen)}
          className="card">
          <motion.div className="title">
            <motion.h3 layout="position">{data.position}</motion.h3>

            <motion.div className="names">
              <motion.h4 layout="position">Company</motion.h4>
              <motion.h4 layout="position">{data.company}</motion.h4>
            </motion.div>
            <motion.div className="names">
              <motion.h4 layout="position">City</motion.h4>
              <motion.h4 layout="position">{data.jobCity}</motion.h4>
            </motion.div>
            <motion.div className="names">
              <motion.h4 layout="position">Country</motion.h4>
              <motion.h4 layout="position">{data.jobCountry}</motion.h4>
            </motion.div>
            <motion.div className="names">
              <motion.h4 layout="position">Job Type</motion.h4>
              <motion.h4 layout="position">{data.jobType}</motion.h4>
            </motion.div>
            <motion.div className="names">
              <motion.h4 layout="position">Job Mode</motion.h4>
              <motion.h4 layout="position">{data.jobMode}</motion.h4>
            </motion.div>
            <motion.div className="names">
              <motion.h4 layout="position">Job Description</motion.h4>
              <motion.h5 layout="position">{data.jobDescription}</motion.h5>
            </motion.div>
            <motion.div className="names">
              <motion.h4 layout="position">Job Profile</motion.h4>
              <motion.h5 layout="position">{data.jobProfile}</motion.h5>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {showCard && (
        <button
          id="likebutton"
          className="likeButton"
          onClick={handlelikebutton}>
          <img
            className="likeIcons"
            src={require("../../assets/images/like.png")}
          />
        </button>
      )}
      {isToggled && (
        <img
          src="https://i.imgur.com/Zkwj970.png"
          alt="new"
          className="animation_like"
        />
      )}

      {showCard && (
        <button
          id="dislikelikebutton"
          className="dislikebtn"
          onClick={handleDislikeButton}>
          <img
            className="dislikeIcons"
            src={require("../../assets/images/thumb-down.png")}
          />
        </button>
      )}
      {isToggled2 && (
        <img
          src="https://i.imgur.com/XqQZ4KR.png"
          alt="new"
          className="animation_like"
        />
      )}
    </div>
  );
};

//

export default JobSwipe;
