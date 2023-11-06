import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logOutRedux } from "../../redux/UserDataSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Url } from "../../config/BaseUrl";
const UserNav = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOutRedux());
    toast.success("Logout Successfully");
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const userData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios
        .post(
          `${Url}/userData`,
          {},
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          console.log(result);
          if (result) {
            if (result.data.success) {
              console.log(result.data.userData);
              dispatch(getUserData(result.data.userData));
            } else {
              // toast(result.data.msg);
              // console.log(result.data.tokenExp);
              localStorage.clear();
            }
          } else {
            console.log("jd");
          }
        })
        .catch((error) => {
          console.log("kd");
        });
    } catch (error) {
      console.log("k");
      console.log(error);
    }
  };
  useEffect(() => {
    userData();
  }, []);
  return (
    <div className="p-2 shadow-md bg-orange-500 drop-shadow-md md:p-4">
      <div className="flex  px-11 h-14 items-center  justify-between w-full ">
        <div className="">
          <h2 className="text-2xl cursor-pointer text-white font-bold">
            <Link to={""}>EVENT TECH</Link>{" "}
          </h2>
        </div>
        <div className="">
          <h2 className="text-2xl cursor-pointer text-white font-bold">
            {user.name ? (
              <Link onClick={handleLogout}> LOGOUT</Link>
            ) : (
              <Link to={"login"}> LOGIN</Link>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
