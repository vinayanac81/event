import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Url } from "../../config/BaseUrl";
import { getUserData } from "../../redux/UserDataSlice";
import BounceLoader from "react-spinners/BounceLoader";
import { RandomColorPicker } from "../../config/RandomColor";
const SelectService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [color, setcolor] = useState("");
  const [foodService, setfoodService] = useState(false);
  const [stageService, setstageService] = useState(false);
  const [decorationService, setdecorationService] = useState(false);
  const [photograpyService, setphotograpyService] = useState(false);
  const [vehicleService, setvehicleService] = useState(false);
  const [isChecked, setisChecked] = useState({
    stageService: false,
    cateringService: false,
    decorationService: false,
    vehicleService: false,
    photograpyService: false,
  });
  const [serviceDetails, setserviceDetails] = useState({});
  //    console.log(id);
  const handleSelectedService = async () => {
    try {
      const token = localStorage.getItem("token");
      const { stageService, cateringService,photograpyService,vehicleService, decorationService } = isChecked;
      const { data } = await axios.post(
        `${Url}/selected-services`,
        { stageService, cateringService, decorationService,photograpyService,vehicleService, id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        localStorage.setItem("selected", true);
        localStorage.setItem("company", id);

        navigate(`/selected-service/${id}`, {
          state: {
            id: id,
          },
        });
      } else if (data.tokenExp === true || data.noToken === true) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      setloading(true);
      setcolor(RandomColorPicker());
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${Url}/get-company-detail/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setloading(false);
      // console.log(data);
      if (data.success) {
        setserviceDetails(data.serviceDetails);
        setfoodService(data.serviceDetails.catering_status);
        setstageService(data.serviceDetails.stage_status);
        setdecorationService(data.serviceDetails.decoration_status);
        setphotograpyService(data.serviceDetails.photography_status);
        setvehicleService(data.serviceDetails.vehicle_status);
      } else if (data.tokenExp) {
        toast.error("Authentication Failed");
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckBox = (name) => {
    if (name === "stageService") {
      setisChecked((pre) => {
        return {
          ...pre,
          [name]: !isChecked.stageService,
        };
      });
    } else if (name === "cateringService") {
      setisChecked((pre) => {
        return {
          ...pre,
          [name]: !isChecked.cateringService,
        };
      });
    }else if(name==="decorationService"){
      setisChecked((pre) => {
        return {
          ...pre,
          [name]: !isChecked.decorationService,
        };
      });
    }
    else if(name==="photograpyService"){
      setisChecked((pre) => {
        return {
          ...pre,
          [name]: !isChecked.photograpyService,
        };
      });
    }
    else if(name==="vehicleService"){
      setisChecked((pre) => {
        return {
          ...pre,
          [name]: !isChecked.vehicleService,
        };
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="sweet-loading absolute inset-0 backdrop-blur-sm  top-20 bg-opacity-60 w-full flex h-[93vh] items-center justify-center">
            <div className="flex px-4 flex-col bg-opacity-90 items-center   py-5 rounded-lg  w-[65%]">
              {" "}
              <BounceLoader
                color={color}
                loading={loading}
                cssOverride={{
                  borderColor: "blue",
                }}
                size={300}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 justify-center items-center md:px-14 py-2 md:py-8 bg-indigo-800 h-[91vh] flex w-full text-white">
          <div className="flex w-[50%] px-6 py-2 text-black bg-slate-200 flex-col rounded-lg h-[80%] ">
            <div className="flex w-full font-medium text-3xl pb-6 justify-center">
              Select Services
            </div>{" "}
            {stageService && (
              <>
                <div className="flex w-full mb-4 items-center ">
                  <div className="flex w-[50%] items-center justify-evenly">
                    <div className="w-[30%]">
                      <div className="w-14 h-14">
                        <img
                          className="w-full h-full rounded-lg"
                          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="w-[70%]">
                      <h2 className="font-bold font-serif">
                        {serviceDetails.stage_name}
                      </h2>
                    </div>
                  </div>
                  <div className="w-[50%] pr-10  flex items-end">
                    <div className="w-6 ml-auto h-6">
                      <input
                        className="w-full h-full"
                        type="checkbox"
                        name="selectStage"
                        checked={isChecked.stageService}
                        onChange={() => handleCheckBox("stageService")}
                        id=""
                      />
                    </div>{" "}
                  </div>
                </div>
              </>
            )}
            {foodService && (
              <>
                <div className="flex w-full mb-4 items-center ">
                  <div className="flex w-[50%] items-center justify-evenly">
                    <div className="w-[30%]">
                      {" "}
                      <div className="w-14 h-14">
                        <img
                          className="w-full h-full rounded-lg"
                          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="w-[70%]">
                      <h2 className="font-bold font-serif">
                        {serviceDetails.catering_name}
                      </h2>
                    </div>
                  </div>
                  <div className="w-[50%] pr-10  flex items-end">
                    <div className="w-6 ml-auto h-6">
                      <input
                        className="w-full h-full"
                        type="checkbox"
                        name="selectStage"
                        checked={isChecked.cateringService}
                        onChange={() => handleCheckBox("cateringService")}
                        id=""
                      />
                    </div>{" "}
                  </div>
                </div>
              </>
            )}
            {decorationService && (
              <>
                <div className="flex mb-4 w-full items-center ">
                  <div className="flex w-[50%] items-center justify-evenly">
                    <div className="w-[30%]">
                      {" "}
                      <div className="w-14 h-14">
                        <img
                          className="w-full h-full rounded-lg"
                          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="w-[70%]">
                      <h2 className="font-bold font-serif">
                        {serviceDetails.decoration_name}
                      </h2>
                    </div>
                  </div>
                  <div className="w-[50%] pr-10  flex items-end">
                    <div className="w-6 ml-auto h-6">
                      <input
                        className="w-full h-full"
                        type="checkbox"
                        name="selectStage"
                        checked={isChecked.decorationService}
                        onChange={() => handleCheckBox("decorationService")}
                        id=""
                      />
                    </div>{" "}
                  </div>
                </div>
              </>
            )}
            {photograpyService && (
              <>
                <div className="flex w-full mb-4 items-center ">
                  <div className="flex w-[50%] items-center justify-evenly">
                    <div className="w-[30%]">
                      <div className="w-14 h-14">
                        <img
                          className="w-full h-full rounded-lg"
                          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="w-[70%]">
                      <h2 className="font-bold font-serif">
                        {serviceDetails.photography_name}
                      </h2>
                    </div>
                  </div>
                  <div className="w-[50%] pr-10  flex items-end">
                    <div className="w-6 ml-auto h-6">
                      <input
                        className="w-full h-full"
                        type="checkbox"
                        name="selectStage"
                        checked={isChecked.photograpyService}
                        onChange={() => handleCheckBox("photograpyService")}
                        id=""
                      />
                    </div>{" "}
                  </div>
                </div>
              </>
            )}
            {vehicleService && (
              <>
                <div className="flex w-full mb-4 items-center ">
                  <div className="flex w-[50%] items-center justify-evenly">
                    <div className="w-[30%]">
                      {" "}
                      <div className="w-14 h-14">
                        <img
                          className="w-full h-full rounded-lg"
                          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="w-[70%]">
                      <h2 className="font-bold font-serif">
                        {serviceDetails.vehicle_name}
                      </h2>
                    </div>
                  </div>
                  <div className="w-[50%] pr-10  flex items-end">
                    <div className="w-6 ml-auto h-6">
                      <input
                        className="w-full h-full"
                        type="checkbox"
                        name="selectStage"
                        checked={isChecked.vehicleService}
                        onChange={() => handleCheckBox("vehicleService")}
                        id=""
                      />
                    </div>{" "}
                  </div>
                </div>
              </>
            )}
            <div className="flex py-5 justify-center pb-5 w-full">
              <button
                onClick={handleSelectedService}
                className="bg-indigo-500 text-white font-bold py-2 px-8 rounded-lg"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectService;
