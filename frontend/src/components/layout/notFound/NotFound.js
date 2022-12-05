import React from "react";
import { Link } from "react-router-dom";
import { Error } from "@mui/icons-material"
import { Typography } from "@mui/material"
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <Error />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;