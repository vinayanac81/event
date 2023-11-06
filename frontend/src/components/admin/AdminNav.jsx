import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminNav = () => {
 const value= localStorage.getItem('status')
  return (
    <div className="p-2 shadow-md bg-orange-500 drop-shadow-md md:p-4">
      <div className="flex  px-11  h-14 justify-between w-full ">
        <div className="">
          <h2 className="text-2xl cursor-pointer text-white font-bold">
            <Link to={"admin"}>Admin Panel</Link>{" "}
          </h2>
        </div>
        <div className="">
          <h2 className="text-2xl cursor-pointer text-white font-bold">
            <Link to={"admin"}> LOGIN</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
