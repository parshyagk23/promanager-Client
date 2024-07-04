import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../../api/auth";
import LoadingPage from "../Error/Loading/LoadingPage";

function ProtectedRoute(prop) {
 
  const { Component } = prop;
  const navigate = useNavigate();

  function isTokenExpired(token) {
    const decoded = jwtDecode(token);
    const expiry = decoded.exp;
    return (Date.now() >= expiry * 1000);
}
function checkAndRemoveToken() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token && isTokenExpired(token)) {
      localStorage.clear()
      toast.error('Not Authorised')   
      navigate('/')
      return
  }
  return token
}
const isLoggedIn=checkAndRemoveToken();
  
 

  return <div>{isLoggedIn ? <Component /> : <LoadingPage/>}</div>;
}

export default ProtectedRoute;
