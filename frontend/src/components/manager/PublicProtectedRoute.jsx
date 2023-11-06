/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
const PublicProtectedRoute = (props) => {
  if (localStorage.getItem("manager-token")) {
    toast.error("Already Login");

    return <Navigate to="/manager/dashboard" />;
  }

  return props.children;
};

export default PublicProtectedRoute;
