import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/manager/LeftLayout";
import { FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import BounceLoader from "react-spinners/BounceLoader";
import { AdminUrl, ManagerUrl } from "../../config/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RandomColorPicker } from "../../config/RandomColor";
import { getManagerData } from "../../redux/ManagerInfo";
import { useDispatch } from "react-redux";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [loading, setloading] = useState(false);
  const [color, setcolor] = useState("");
  const [dashboardData, setdashboardData] = useState([]);
  const managerData = async () => {
    try {
      setloading(true);
      setcolor(RandomColorPicker())
      const token = localStorage.getItem("manager-token");
      const manager = await axios.post(
        `${ManagerUrl}/manager-data`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setloading(false);
      if (manager.data.success) {
        dispatch(getManagerData(manager.data.managerData))
        setdashboardData(manager.data.booking[0].form);
      } else {
        toast.error(manager.data.msg);
        setTimeout(() => {
          navigate("/manager");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    managerData();
    window.scrollTo(0, 0);
  }, []);
  const totalPrice = dashboardData.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
  return (
    <div className="py-16">
      <div className="w-full h-[91vh] flex bg-slate-500">
        <div className="w-[20%] h-full bg-slate-950">
          <LeftLayout name="dashboard" />
        </div>
        <div className="w-[80%] relative h-full bg-slate-700">
          {loading ? (
            <>
              <div className="sweet-loading absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[91vh] items-center justify-center">
                <div className="flex px-4 flex-col bg-opacity-90 items-center   py-5 rounded-lg  w-[65%]">
                  {" "}
                  <BounceLoader
                    color={color}
                    loading={loading}
                    cssOverride={{
                      borderColor: "blue",
                    }}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
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
                        <h2>Total Orders</h2>
                      </div>
                      <div>{dashboardData.length}</div>
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
                        <h2>Total Payment</h2>
                      </div>
                      <div>{totalPrice}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
