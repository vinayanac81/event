import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Url } from "../../config/BaseUrl";
import BounceLoader from "react-spinners/BounceLoader";
import { RandomColorPicker } from "../../config/RandomColor";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/UserDataSlice";
const CompanyDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [managerDetails, setmanagerDetails] = useState({});
  //catering
  const [cateringStatus, setcateringStatus] = useState(false);
  const [cateringPopup, setcateringPopup] = useState(false);
  const [starterStatus, setstarterStatus] = useState(false);
  const [starterMenu, setstarterMenu] = useState([]);
  const [mainStatus, setmainStatus] = useState(false);
  const [mainMenu, setmainMenu] = useState([]);
  const [dessertStatus, setdessertStatus] = useState(false);
  const [dessertMenu, setdessertMenu] = useState([]);
  const [saladStatus, setsaladStatus] = useState(false);
  const [saladMenu, setsaladMenu] = useState([]);
  //stage
  const [stageStatus, setstageStatus] = useState(false);
  const [stagePopup, setstagePopup] = useState(false);
  const [stageMenu, setstageMenu] = useState([]);
  //decoration
  const [decorationStatus, setdecorationStatus] = useState(false);
  const [decorationPopup, setdecorationPopup] = useState(false);
  const [decorationMenu, setdecorationMenu] = useState([]);
  //photograpy
  const [photograpyStatus, setphotograpyStatus] = useState(false);
  const [photograpyPopup, setphotograpyPopup] = useState(false);
  const [photograpyMenu, setphotograpyMenu] = useState([]);
  //vehicle
  const [vehicleStatus, setvehicleStatus] = useState(false);
  const [vehiclePopup, setvehiclePopup] = useState(false);
  const [vehicleMenu, setvehicleMenu] = useState([]);
  //loading and color
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  useEffect(() => {
    getCompanyDetail();
  }, []);
  const getCompanyDetail = async () => {
    try {
      setLoading(true);
      let randomColor = RandomColorPicker();
      setColor(randomColor);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${Url}/get-company-detail/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setLoading(false);
      if (data.success) {
        dispatch(getUserData(data.userData));
        setmanagerDetails(data.managerData);
        setcateringStatus(data.serviceDetails.catering_status);
        setstarterStatus(data.serviceDetails.starter_status);
        setdessertStatus(data.serviceDetails.dessert_status);
        setmainStatus(data.serviceDetails.main_status);
        setsaladStatus(data.serviceDetails.salad_status);
        setstageStatus(data.serviceDetails.stage_status);
        setdecorationStatus(data.serviceDetails.decoration_status);
        setphotograpyStatus(data.serviceDetails.photograpy_status);
        setvehicleStatus(data.serviceDetails.vehicle_status);
        setstageMenu(data.serviceDetails.stageMenu);
        setdecorationMenu(data.serviceDetails.decorationMenu)
        setphotograpyMenu(data.serviceDetails.photograpyMenu)
        setvehicleMenu(data.serviceDetails.vehicleMenu)
        if (data.serviceDetails.catering_status) {
          if (data.serviceDetails.stage_status) {
            setstarterMenu(data.serviceDetails.starter_menu);
          }
          if (data.serviceDetails.dessert_status) {
            setdessertMenu(data.serviceDetails.dessert_menu);
          }
          if (data.serviceDetails.main_status) {
            setmainMenu(data.serviceDetails.main_menu);
          }
          if (data.serviceDetails.salad_status) {
            setsaladMenu(data.serviceDetails.salad_menu);
          }
        }
      } else if (data.tokenExp) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStagePopup = () => {
    setstagePopup(!stagePopup);
    window.scroll(0, 0);
  };
  const handleCateringPopup = () => {
    setcateringPopup(!cateringPopup);
    window.scroll(0, 0);
  };
  const handleDecorationPopup = () => {
    setdecorationPopup(!decorationPopup);
    window.scroll(0, 0);
  };
  const handlePhotograpyPopup = () => {
    setphotograpyPopup(!photograpyPopup);
    window.scroll(0, 0);
  };
  const handleVehiclePopup = () => {
    setvehiclePopup(!vehiclePopup);
    window.scroll(0, 0);
  };
  return (
    <div className="w-full scroll-smooth relative px-2 md:px-36 pb-10  bg-blue-300">
      {cateringPopup && (
        <>
          <div className="absolute inset-0 backdrop-blur-sm  top-10 bg-opacity-60 w-full flex max-h-min   justify-center">
            <div className="flex px-10 flex-col   py-5 rounded-lg bg-black w-[65%]">
              <div className="flex justify-between pb-10 items-center">
                <h2 className="text-white">Catering Menu Details</h2>
                <button
                  onClick={handleCateringPopup}
                  className="px-10 bg-yellow-400 scroll-smooth   rounded-lg py-2"
                >
                  Close
                </button>
              </div>
              {starterStatus && (
                <>
                  <div className="flex flex-col">
                    <div className="flex w-full text-white font-serif font-bold justify-center">
                      Starter
                    </div>
                    <div className="flex flex-wrap w-full justify-center pt-10 pb-10  gap-10">
                      {starterMenu.map((item, id) => {
                        return (
                          <div key={id}>
                            <div className="w-100 h-60">
                              <img
                                className="w-full h-full"
                                src={item.starter_image}
                                alt=""
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              {mainStatus && (
                <>
                  <div className="flex flex-col">
                    <div className="flex w-full text-white font-serif font-bold justify-center">
                      Main
                    </div>
                    <div className="flex flex-wrap w-full justify-center pt-10 pb-10  gap-10">
                      {mainMenu.map((item, id) => {
                        return (
                          <div key={id}>
                            <div className="w-100 h-60">
                              <img
                                className="w-full h-full"
                                src={item.main_image}
                                alt=""
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              {dessertStatus && (
                <>
                  <div className="flex flex-col">
                    <div className="flex w-full text-white font-serif font-bold justify-center">
                      Dessert
                    </div>
                    <div className="flex flex-wrap w-full justify-center pt-10 pb-10  gap-10">
                      {dessertMenu.map((item, id) => {
                        return (
                          <div key={id}>
                            <div className="w-100 h-60">
                              <img
                                className="w-full h-full"
                                src={item.dessert_image}
                                alt=""
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              {saladStatus && (
                <>
                  <div className="flex flex-col">
                    <div className="flex w-full text-white font-serif font-bold justify-center">
                      Salad
                    </div>
                    <div className="flex flex-wrap w-full justify-center pt-10 pb-10  gap-10">
                      {saladMenu.map((item, id) => {
                        return (
                          <div key={id}>
                            <div className="w-100 h-60">
                              <img
                                className="w-full h-full"
                                src={item.salad_image}
                                alt=""
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      {stagePopup && (
        <>
          <div className="absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[93vh] items-center justify-center">
            <div className="flex px-10 flex-col   py-5 rounded-lg bg-black w-[65%]">
              <div className="flex justify-between pb-10 items-center">
                <h2 className="text-white">Stage Menu Details</h2>
                <button
                  onClick={handleStagePopup}
                  className="px-10 bg-yellow-400 scroll-smooth   rounded-lg py-2"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full text-white font-serif font-bold justify-center">
                  Stage
                </div>
                <div className="flex flex-wrap w-full justify-center pt-10 pb-10  gap-10">
                  {stageMenu.map((item, id) => {
                    return (
                      <div key={id}>
                        <div className="w-100 h-60">
                          <img
                            className="w-full h-full"
                            src={item.stage_image}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
       {decorationPopup && (
        <>
          <div className="absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[93vh] items-center justify-center">
            <div className="flex px-10 flex-col   py-5 rounded-lg bg-black w-[65%]">
              <div className="flex justify-between pb-10 items-center">
                <h2 className="text-white">Decoration Menu</h2>
                <button
                  onClick={handleDecorationPopup}
                  className="px-10 bg-yellow-400 scroll-smooth   rounded-lg py-2"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full text-white font-serif font-bold justify-center">
                  Decoration
                </div>
                <div className="flex flex-wrap w-full justify-center pt-10 pb-10  gap-10">
                  {decorationMenu.map((item, id) => {
                    return (
                      <div key={id}>
                        <div className="w-100 h-60">
                          <img
                            className="w-full h-full"
                            src={item.decoration_image}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
       {vehiclePopup && (
        <>
          <div className="absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[93vh] items-center justify-center">
            <div className="flex px-10 flex-col   py-5 rounded-lg bg-black w-[65%]">
              <div className="flex justify-between pb-10 items-center">
                <h2 className="text-white">Vehicle Menu Details</h2>
                <button
                  onClick={handleVehiclePopup}
                  className="px-10 bg-yellow-400 scroll-smooth   rounded-lg py-2"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full text-white font-serif font-bold justify-center">
                  Vehicle
                </div>
                <div className="flex flex-wrap w-full justify-center pt-10 pb-10  gap-10">
                  {vehicleMenu.map((item, id) => {
                    return (
                      <div key={id}>
                        <div className="w-100 h-60">
                          <img
                            className="w-full h-full"
                            src={item.vehicle_image}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {loading && (
        <>
          <div className="sweet-loading absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[93vh] items-center justify-center">
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
      )}
      <div className="w-full flex flex-col ">
        <div className="flex items-center w-full pt-14 pb-8 justify-between">
          <div className="flex">
            <button className="bg-yellow-400 hover:bg-yellow-600 py-2 rounded-md px-10">
              Back
            </button>
          </div>
          <div className="">{managerDetails.company_name}</div>
          <div className="">
            <Link to={`/select-service/${id}`} state={{ id: id }}>
              {" "}
              <button className="bg-emerald-400 hover:bg-emerald-600 py-2 rounded-md px-10">
                Select
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full  bg-white  flex rounded-xl flex-col">
          <div className=" flex pt-6    w-full">
            <div className="flex justify-center border-b w-full items-center pb-2 flex-col">
              <div className="w-40 pb-4 h-40">
                <img
                  className="w-full rounded-2xl object-fit h-full shadow-xl"
                  src={managerDetails.manager_image}
                  alt=""
                />
              </div>
              <div className="">{managerDetails.name}</div>
              <div className="">Manager Name</div>
            </div>
          </div>
          <div className="px-8 flex pb-4 flex-col pt-4">
            <h2 className="pb-4 flex justify-center">About us</h2>
            <h2 className="pb-3">ss</h2>
          </div>
          <div className="flex flex-col w-full px-8">
            <div className="pb-8 flex w-full justify-center">
              <h2>Our Recent Works</h2>
            </div>
            <div className="flex justify-around pb-8 w-full gap-10 flex-wrap">
              <div className="w-72 h-60">
                <img
                  className="w-full h-full shadow-xl"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                  alt=""
                />
              </div>
              <div className="w-72 h-60">
                <img
                  className="w-full h-full shadow-xl"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                  alt=""
                />
              </div>
              <div className="w-72 h-60">
                <img
                  className="w-full h-full shadow-xl"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full px-10 flex pb-12 pt-4 flex-col">
              <div className="flex justify-center pb-8">
                Our Providing Service
              </div>
              <div className="flex bg-slate-200  flex-col rounded-lg   w-full">
                <div className="flex bg-slate-300 border-b  text-slate-800 w-full py-3 px-4">
                  <div className="w-[60%]">SERVICES</div>
                  <div className="w-[40%]">DETAILS</div>
                </div>
                {cateringStatus && (
                  <>
                    <div className="flex bg-slate-600 border-b items-center text-slate-400 w-full py-3 px-4">
                      <div className="w-[60%]">Food Service</div>
                      <div className="w-[40%]">
                        <div className="flex ">
                          <button
                            onClick={handleCateringPopup}
                            className="bg-emerald-200 hover:bg-emerald-500 hover:text-white px-10 text-slate-600 rounded py-2"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {stageStatus && (
                  <>
                    <div className="flex bg-slate-600 border-b items-center text-slate-400 w-full py-3 px-4">
                      <div className="w-[60%]">Stage Service</div>
                      <div className="w-[40%]">
                        {" "}
                        <div className="flex ">
                          <button
                            onClick={handleStagePopup}
                            className="bg-emerald-200 px-10  hover:bg-emerald-500 hover:text-white text-slate-600 rounded py-2"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {decorationStatus && (
                  <>
                    <div className="flex bg-slate-600 border-b items-center text-slate-400 w-full py-3 px-4">
                      <div className="w-[60%]">Decoration Service</div>
                      <div className="w-[40%]">
                        {" "}
                        <div className="flex ">
                          <button
                            onClick={handleDecorationPopup}
                            className="bg-emerald-200 px-10  hover:bg-emerald-500 hover:text-white text-slate-600 rounded py-2"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {photograpyStatus && (
                  <>
                    <div className="flex bg-slate-600 border-b items-center text-slate-400 w-full py-3 px-4">
                      <div className="w-[60%]">Photograpy Service</div>
                      <div className="w-[40%]">
                        {" "}
                        <div className="flex ">
                          <button
                            onClick={handlePhotograpyPopup}
                            className="bg-emerald-200 px-10  hover:bg-emerald-500 hover:text-white  text-slate-600 rounded py-2"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {vehicleStatus && (
                  <>
                    <div className="flex bg-slate-600 items-center  text-slate-400 w-full py-3 px-4">
                      <div className="w-[60%]">Luxury Vehicle Service</div>
                      <div className="w-[40%]">
                        {" "}
                        <div className="flex ">
                          <button
                            onClick={handleVehiclePopup}
                            className="bg-emerald-200 px-10  hover:bg-emerald-500 hover:text-white text-slate-600 rounded py-2"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
