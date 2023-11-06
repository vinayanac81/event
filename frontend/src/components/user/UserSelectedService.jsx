/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const UserSelectedService = () => {
    let id=localStorage.getItem("company")
    let sel=localStorage.getItem("selected")
    console.log(id,sel);
    if (sel==true) {
        console.log("hy");
        return props.children;
      }
      console.log("l");
    //   toast.error('You have no account, Please Login');
      return <Navigate to={`/select-service/${id}`} />;
}

export default UserSelectedService