import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/manager/LeftLayout";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import { ManagerUrl } from "../../config/BaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RandomColorPicker } from "../../config/RandomColor";
import { useDispatch } from "react-redux";
import { getManagerData } from "../../redux/ManagerInfo";
const Services = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [loading, setloading] = useState(false)
  const [color, setcolor] = useState("")
  const [foodStatus, setfoodStatus] = useState(false);
  const [stageStatus, setstageStatus] = useState(false);
  const [decorationStatus, setdecorationStatus] = useState(false);
  const [vehicle, setvehicle] = useState(false);
  const [photograpy, setphotograpy] = useState(false);
  const fetchServices = async () => {
    setloading(true)
    setcolor(RandomColorPicker())
    const token = localStorage.getItem("manager-token");
    const { data } = await axios.get(`${ManagerUrl}/addedServices`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    
    setloading(false)
    // dispatch(getManagerData(data.manager[0]))
    setfoodStatus(data.service.catering_status);
    setstageStatus(data.service.stage_status);
    setdecorationStatus(data.service.decoration_status)
    setphotograpy(data.service.photography_status)
    setvehicle(data.service.vehicle_status)
  };
  useEffect(() => {
    fetchServices();
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  const showAlert = (alert) => {
    toast.error(alert);
  };
  const handleStageStatus = async (status) => {
    const token = localStorage.getItem("manager-token");
    const { data } = await axios.put(
      `${ManagerUrl}/update-stage-status`,
      { status },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      toast.success(data.msg);
      setstageStatus(data.result[0].stage_status);
    }
  };
  const handleFoodStatus = async (status) => {
    const token = localStorage.getItem("manager-token");
    const { data } = await axios.put(
      `${ManagerUrl}/update-food-status`,
      { status },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    if (data.success) {
      toast.success(data.msg);
      setfoodStatus(data.result[0].catering_status);
    }
  };
  const handleDecorationStatus = async (status) => {
    const token = localStorage.getItem("manager-token");
    const { data } = await axios.put(
      `${ManagerUrl}/update-decoration-status`,
      { status },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    if (data.success) {
      toast.success(data.msg);
      setdecorationStatus(data.result[0].decoration_status);
    }
  };
  const handlePhotograpyStatus = async (status) => {
    const token = localStorage.getItem("manager-token");
    const { data } = await axios.put(
      `${ManagerUrl}/update-photograpy-status`,
      { status },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    if (data.success) {
      toast.success(data.msg);
      setphotograpy(data.result[0].photograpy_status);
    }
  };
  const handleVehicleStatus = async (status) => {
    const token = localStorage.getItem("manager-token");
    const { data } = await axios.put(
      `${ManagerUrl}/update-vehicle-status`,
      { status },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    if (data.success) {
      toast.success(data.msg);
      setvehicle(data.result[0].vehicle_status);
    }
  };
  return (<>
   <div className="py-16">
    <div className="w-full h-[91vh] flex bg-slate-500">
      <div className="w-[20%] h-full bg-slate-950">
        <LeftLayout name="services" />
      </div>
      
      <div className="w-[80%] relative flex justify-center pt-10  bg-slate-700">
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
      ):<>
        <div className="flex rounded-lg drop-shadow-md justify-center flex-col w-[70%] h-[80vh]   bg-indigo-900">
          <div className="flex justify-center pt-3">
            <h2 className="text-3xl font-bold">Select Your Service</h2>
          </div>
          <div className="flex w-[100%] justify-center py-4">
            <div className="flex w-[50%] h-16 rounded-lg  justify-center items-center bg-blue-400 ">
              <div className="w-[50%] px-3 rounded items-center flex">
                {/* <div className="w-10 h-10 rounded">
                  <img
                    className="w-full rounded-lg h-full"
                    src="https://www.cvent.com/sites/default/files/styles/focus_scale_and_crop_800x450/public/migrated_attachments/meal-918638_1280-1.jpg?itok=dMJGxEC2"
                    alt=""
                  />
                </div> */}
                <div className="px-2 flex font-bold items-center">
                  Food Service
                </div>
              </div>

              <div className="w-[50%] flex">
                <button
                  onClick={() => {
                    foodStatus
                      ? showAlert("Alreaday added to services")
                      : handleFoodStatus(true);
                  }}
                  className="ml-auto px-3 rounded-lg py-1 mr-5 font-bold text-white bg-orange-500 hover:bg-orange-700"
                >
                  {foodStatus ? "Added" : "Add"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[100%] justify-center pb-4">
            <div className="flex w-[50%] h-16 rounded-lg  justify-center items-center bg-blue-400 ">
              <div className="w-[50%] px-3 rounded flex">
                {/* <div className="w-10 h-10 rounded">
                  <img
                    className="w-full rounded-full h-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFeJuUtsr9stam2ukWuSbMvZHjscTW4YUBVyx16Lv0pA&s"
                    alt=""
                  />
                </div> */}
                <div className="px-2 flex font-bold items-center">
                  Stage Service
                </div>
              </div>

              <div className="w-[50%] flex">
                <button
                  onClick={() => {
                    stageStatus
                      ? showAlert("Already added to services")
                      : handleStageStatus(true);
                  }}
                  className="ml-auto  px-3 md:px-5 rounded-lg py-1 mr-5  font-bold text-white bg-orange-500 hover:bg-orange-700"
                >
                  {stageStatus ? "Added" : "Add"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[100%] justify-center pb-4">
            <div className="flex w-[50%] h-16 rounded-lg  justify-center items-center bg-blue-400 ">
              <div className="w-[50%] px-3 rounded flex">
                {/* <div className="w-10 h-10 rounded">
                  <img
                    className="w-full rounded-full h-full"
                    src="https://www.shutterstock.com/image-photo/stage-decoration-flowers-indian-traditional-260nw-2080703155.jpg"
                    alt=""
                  />
                </div> */}
                <div className="px-2 flex font-bold items-center">
                  Decoration Service
                </div>
              </div>

              <div className="w-[50%] flex">
                <button
                  onClick={() => {
                    decorationStatus
                      ? showAlert("Already added to services")
                      : handleDecorationStatus(true);
                  }}
                  className="ml-auto  px-3 md:px-5 rounded-lg py-1 mr-5  font-bold text-white bg-orange-500 hover:bg-orange-700"
                >
                  {decorationStatus ? "Added" : "Add"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[100%] justify-center pb-4">
            <div className="flex w-[50%] h-16 rounded-lg  justify-center items-center bg-blue-400 ">
              <div className="w-[50%] px-3 rounded flex">
                {/* <div className="w-10 h-10 rounded">
                  <img
                    className="w-full rounded-full h-full"
                    src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/07/social-media-for-photographers-follow-1.jpg"
                    alt=""
                  />
                </div> */}
                <div className="px-2 flex font-bold items-center">
                  Photograpy Service
                </div>
              </div>

              <div className="w-[50%]  flex ">
                <button
                  onClick={() => {
                    photograpy
                      ? showAlert("Already added to services")
                      : handlePhotograpyStatus(true);
                  }}
                  className="ml-auto  px-3 md:px-5 rounded-lg py-1 mr-5  font-bold text-white bg-orange-500 hover:bg-orange-700"
                >
                  {photograpy ? "Added" : "Add"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[100%]  justify-center pb-4">
            <div className="flex w-[50%] h-16 rounded-lg  justify-center items-center bg-blue-400 ">
              <div className="w-[50%] px-3 rounded flex bg-blue-400">
                {/* <div className="w-10 h-10 rounded">
                  <img
                    className="w-full rounded-full h-full"
                    src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?cs=srgb&dl=pexels-jay-pizzle-3764984.jpg&fm=jpg"
                    alt=""
                  />
                </div> */}
                <div className="px-2 flex font-bold items-center">
                  Luxury Vehicle Service
                </div>
              </div>

              <div className="w-[50%] flex  bg-blue-400">
                <button
                  onClick={() => {
                    vehicle
                      ? showAlert("Already added to services")
                      : handleVehicleStatus(true);
                  }}
                  className="ml-auto  px-3 md:px-5 rounded-lg py-1 mr-5  font-bold text-white bg-orange-500 hover:bg-orange-700"
                >
                  {vehicle ? "Added" : "Add"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-100 justify-center pt-2"></div>
        </div>
      </>}
      
      </div>
    </div>
  </div>
    </>
   
  );
};

export default Services;
