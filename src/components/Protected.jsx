import React from "react";
import Visitors from "../views/Visitors/Visitors";
import { Navigate } from "react-router-dom";

const Protected = () => {
 const user = localStorage.getItem('user')
 if(user)
 {
    return(
        <Visitors></Visitors>
    )
 }
 else
 {
    return <Navigate to={"/"}></Navigate>
 }
};

export default Protected;
