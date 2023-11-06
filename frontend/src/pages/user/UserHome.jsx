import React, { useEffect, useState } from "react";
import { Url } from "../../config/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/UserDataSlice";
import UserNav from "../../components/user/UserNav";

const UserHome = () => {
  const [tokenExp, settokenExp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  }, [userData]);
  const addEvent = () => {
    navigate("/company-list");
  };
  return (<>
    <div className="h-[910vh] bg-slate-500">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="fixed bottom-4 md:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2">
          <button
            type="button"
            onClick={addEvent}
            className="px-10 w-full md:w-auto py-3 text-2xl font-semibold font-serif bg-orange-500 text-white rounded-3xl hover:bg-orange-600"
          >
            Add Event
          </button>
        </div>
      </div>
    </div></>
  );
};

export default UserHome;
