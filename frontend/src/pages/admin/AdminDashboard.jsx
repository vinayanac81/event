import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeftLayout from "../../components/admin/LeftLayout";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { AdminUrl } from "../../config/BaseUrl";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [dashboardCount, setdashboardCount] = useState({});
  const dashboardData = async () => {
    try {
      const result = await axios.get(`${AdminUrl}/dashboard`);
      if (result) {
        if (result.data.success) {
          toast.success("data fetched");
          console.log(result.data.dashboardHeader);
          setdashboardCount(result.data.dashboardHeader);
        }
      } else {
        console.log("somthing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dashboardData();
  }, []);
  return (
    <div>
      <div className="w-full h-[91vh] flex bg-slate-500">
        <div className="w-[20%] h-full bg-slate-950">
          <LeftLayout name="dashboard" />
        </div>
        <div className="w-[80%] h-full bg-slate-700">
          <div className="flex  flex-col w-full">
            <div className="flex w-full justify-center py-10">
              {" "}
              <h2 className=" text-white text-2xl font-bold">Dashboard</h2>
            </div>
            <div className="flex justify-around w-full">
              <div className="flex bg-slate-300 py-3 w-full mx-20 justify-around rounded">
                <div className="">
                  {" "}
                  <span className="text-6xl ">
                    <FaUsers />
                  </span>
                </div>
                <div className="flex font-bold  text-xl items-center flex-col">
                  <div>
                    <h2>Total Users</h2>
                  </div>
                  <div>
                    {" "}
                    {dashboardCount.Total_users ? (
                      <span>{dashboardCount.Total_users}</span>
                    ) : (
                      <span>Loading...</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex bg-slate-300 py-3 w-full mx-20 justify-around rounded">
                <div className="">
                  {" "}
                  <span className="text-6xl ">
                    <FaUsers />
                  </span>
                </div>
                <div className="flex font-bold  text-xl items-center flex-col">
                  <div>
                    <h2>Total Managers</h2>
                  </div>
                  <div>
                    {" "}
                    {dashboardCount.Total_managers || dashboardCount.Total_managers===0 ? (
                      <span>{dashboardCount.Total_managers}</span>
                    ) : (
                      <span>Loading...</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex bg-slate-300 py-3 w-full mx-20 justify-around rounded">
                <div className="">
                  {" "}
                  <span className="text-6xl ">
                    <FaUsers />
                  </span>
                </div>
                <div className="flex font-bold  text-md items-center flex-col">
                  <div>
                    <h2>Approved Managers</h2>
                  </div>
                  <div>
                    {" "}
                    {dashboardCount.Total_approved_managers === 0 ||
                    dashboardCount.Total_approved_managers === 0 ? (
                      <span className="text-xl">
                        {dashboardCount.Total_approved_managers}
                      </span>
                    ) : (
                      <span className="text-2xl">Loading...</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
