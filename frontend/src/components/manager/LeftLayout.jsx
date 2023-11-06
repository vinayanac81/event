import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutRedux } from "../../redux/ManagerInfo";

const LeftLayout = ({ name }) => {
  const dispatch=  useDispatch()
  const [active, setactive] = useState({
    dashboard: false,
    bookings: false,
    menuList: false,
    services: false,
    salesReport: false,
    logout: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    setactive((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
  }, [name]);
  const handleLogout = () => {

    dispatch(logOutRedux());
    localStorage.clear();
    navigate("/manager")
  };
  const handleClick=(name)=>{

    setactive((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
    window.scroll(0, 0);
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {" "}
      <Link
        to={"/manager/dashboard"}
        onClick={()=> handleClick(name)}
        className={
          active.dashboard
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }
      >
        Dashboard
      </Link>
      <Link
        to={"/manager/bookings"}
        onClick={()=> handleClick(name)}
        className={
          active.bookings
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }
      >
        Bookings
      </Link>
      <Link
        to={"/manager/menu-list"}
        onClick={()=> handleClick(name)}
        className={
          active.menuList
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }
      >
        Menu List
      </Link>
      <Link
        to={"/manager/services"}
        onClick={()=> handleClick(name)}
        className={
          active.services
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }
      >
        Services
      </Link>
      <Link
        to={"/manager/sales-report"}
        onClick={()=> handleClick(name)}
        className={
          active.salesReport
            ? "my-3 text-white px-10 bg-orange-500 py-2 rounded font-bold"
            : "my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
        }
      >
        Sales Report
      </Link>
      <Link
        onClick={handleLogout}
        className="my-3 text-white px-10 hover:bg-orange-500 py-2 rounded font-bold"
      >
        Logout
      </Link>
    </div>
  );
};

export default LeftLayout;
