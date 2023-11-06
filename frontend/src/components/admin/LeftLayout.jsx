import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const LeftLayout = ({name}) => {
  const [active, setactive] = useState({
    dashboard: false,
    users: false,
    managers: false,
    approvel: false,
    sales: false,
    logout: false,
  });
  const navigate=useNavigate()
  useEffect(()=>{
    setactive((prev)=>{
        return{
        ...prev,[name]:true
        }
    })
  },[name])
  const handleLogout=()=>{
    localStorage.clear()
   

  
    navigate("/admin")
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {" "}
      <Link
        to={"/admin/dashboard"}
        onClick={() =>
          setactive({
            dashboard: true,
            users: false,
            managers: false,
            approvel: false,
            sales: false,
            logout: false,
          })
        }
        className={
          active.dashboard
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }
      >
        Dashboard
      </Link>
      <Link
        to={"/admin/users"}
        onClick={() =>
            setactive({
              dashboard: false,
              users: true,
              managers: false,
              approvel: false,
              sales: false,
              logout: false,
            })
          }
        className={
          active.users
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }
      >
        Users
      </Link>
      <Link  to={"/admin/managers"}
        onClick={() =>
            setactive({
              dashboard: false,
              users: false,
              managers: true,
              approvel: false,
              sales: false,
              logout: false,
            })
          }
        className={
          active.managers
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }>
        Managers
      </Link>
      <Link  to={"/admin/approvel"}
        onClick={() =>
            setactive({
              dashboard: false,
              users: false,
              managers: false,
              approvel: true,
              sales: false,
              logout: false,
            })
          }
        className={
          active.approvel
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }>
        Approvel List
      </Link>
      <Link  to={"/admin/sales"}
        onClick={() =>
            setactive({
              dashboard: false,
              users: false,
              managers: false,
              approvel: false,
              sales: true,
              logout: false,
            })
          }
        className={
          active.sales
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }>
        Sales Report
      </Link>
      <Link onClick={handleLogout} className="my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold">
        Logout
      </Link>
    </div>
  );
};

export default LeftLayout;
