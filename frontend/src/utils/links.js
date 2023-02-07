import React from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "Candidate list", path: "/", icon: <BsFillPersonCheckFill /> },
  { id: 2, text: "All jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 3, text: "Add job", path: "add-job", icon: <FaWpforms /> },
  { id: 4, text: "Profile", path: "profile", icon: <ImProfile /> },
];

export default links;
