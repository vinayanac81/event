import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/manager/LeftLayout";
import axios from "axios";
import { ManagerUrl } from "../../config/BaseUrl";
import { Link } from "react-router-dom";

const AddedServices = () => {
  const [foodCategoryNames, setfoodCategoryNames] = useState([]);
  const [photographyCategoryNames, setphotographyCategoryNames] = useState([]);
  const [stageCategoryNames, setstageCategoryNames] = useState([]);
  const [decorationCategoryNames, setdecorationCategoryNames] = useState([]);
  const [vehicleCategoryNames, setvehicleCategoryNames] = useState([]);
  const [serviceData, setserviceData] = useState([]);
  const [AddedService, setAddedService] = useState(false)
  const fetchAddedServices = async () => {
    try {
      const token = localStorage.getItem("manager-token");
      const { data } = await axios.get(`${ManagerUrl}/addedServices`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      //   console.log(data);

      setserviceData(data.service);
      setfoodCategoryNames(data.service.cateringMenu[0].category_name);
      setphotographyCategoryNames(
        data.service.photographyMenu[0].category_name
      );
      setdecorationCategoryNames(data.service.decorationMenu[0].category_name);
      setstageCategoryNames(data.service.stageMenu[0].category_name);
      setvehicleCategoryNames(data.service.luxuryVehicleMenu[0].category_name);
      if(data.service.photograpy_status || data.service.catering_status || data.service.decoration_status || data.service.vehicle_status || data.service.stage_status === true){
       setAddedService(true)
      }else{
        setAddedService(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(serviceData);
  useEffect(() => {
    fetchAddedServices();
  }, []);
  return (
    <div>
      <div className="w-full h-full flex bg-slate-950">
        <div className="w-[20%] h-[91vh] bg-slate-950">
          <LeftLayout name="" />
        </div>
        <div className="w-[80%] bg-slate-700">
          <div className="flex justify-center pt-10">
            <div className="flex items-center  rounded-lg  bg-blue-500 flex-col w-[70%]">
              <div className="flex justify-center p-5">
                <h2 className="font-bold text-2xl">Your Selected Services</h2>
              </div>

              {serviceData.catering_status && (
                <>
                  <div className="flex w-[70%] py-5 mb-5 gap-5 justify-around bg-slate-300">
                    <div className="w-20 h-20 ">
                      <img
                        className="w-full rounded-full h-full"
                        src="https://www.cvent.com/sites/default/files/styles/focus_scale_and_crop_800x450/public/migrated_attachments/meal-918638_1280-1.jpg?itok=dMJGxEC2"
                        alt=""
                      />
                    </div>
                    <div className="flex items-center font-extrabold">
                      <h2>{serviceData.catering_name}</h2>
                    </div>
                    <div className="flex py-4">
                      <button className="px-5 rounded-lg hover:bg-red-900 bg-red-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              )}
              {serviceData.photograpy_status && (
                <>
                  <div className="flex w-[70%] py-5 mb-5 gap-5 justify-around bg-slate-300">
                    <div className="w-20 h-20 ">
                      <img
                        className="w-full rounded-full h-full"
                        src="https://www.cvent.com/sites/default/files/styles/focus_scale_and_crop_800x450/public/migrated_attachments/meal-918638_1280-1.jpg?itok=dMJGxEC2"
                        alt=""
                      />
                    </div>
                    <div className="flex items-center font-extrabold">
                      <h2>{serviceData.photography_name}</h2>
                    </div>
                    <div className="flex py-4">
                      <button className="px-5 rounded-lg hover:bg-red-900 bg-red-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              )}
              {serviceData.decoration_status && (
                <>
                  <div className="flex w-[70%] py-5 mb-5 gap-5 justify-around bg-slate-300">
                    <div className="w-20 h-20 ">
                      <img
                        className="w-full rounded-full h-full"
                        src="https://www.cvent.com/sites/default/files/styles/focus_scale_and_crop_800x450/public/migrated_attachments/meal-918638_1280-1.jpg?itok=dMJGxEC2"
                        alt=""
                      />
                    </div>
                    <div className="flex items-center font-extrabold">
                      <h2>{serviceData.decoration_name}</h2>
                    </div>
                    <div className="flex py-4">
                      <button className="px-5 rounded-lg hover:bg-red-900 bg-red-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              )}
              {serviceData.vehicle_status && (
                <>
                  <div className="flex w-[70%] py-5 mb-5 gap-5 justify-around bg-slate-300">
                    <div className="w-20 h-20 ">
                      <img
                        className="w-full rounded-full h-full"
                        src="https://www.cvent.com/sites/default/files/styles/focus_scale_and_crop_800x450/public/migrated_attachments/meal-918638_1280-1.jpg?itok=dMJGxEC2"
                        alt=""
                      />
                    </div>
                    <div className="flex items-center font-extrabold">
                      <h2>{serviceData.vehicle_name}</h2>
                    </div>
                    <div className="flex py-4">
                      <button className="px-5 rounded-lg hover:bg-red-900 bg-red-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              )}
              {serviceData.stage_status && (
                <>
                  <div className="flex w-[70%] py-5 mb-5 gap-5 justify-around bg-slate-300">
                    <div className="w-20 h-20 ">
                      <img
                        className="w-full rounded-full h-full"
                        src="https://www.cvent.com/sites/default/files/styles/focus_scale_and_crop_800x450/public/migrated_attachments/meal-918638_1280-1.jpg?itok=dMJGxEC2"
                        alt=""
                      />
                    </div>
                    <div className="flex items-center font-extrabold">
                      <h2>{serviceData.stage_name}</h2>
                    </div>
                    <div className="flex py-4">
                      <button className="px-5 rounded-lg hover:bg-red-900 bg-red-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              )}
              {AddedService ? (
                <>
                  <div className="flex w-[90%]  my-6 rounded-lg bg-slate-700">
                    <div className="flex w-full flex-col">
                      <div className="flex py-4 w-full justify-around">
                        <div className="">
                          <h2 className="font-bold text-white">Services</h2>
                        </div>
                        <div className="">
                          <h2 className="font-bold text-white">Categories</h2>
                        </div>
                        <div className="">
                          <h2 className="font-bold text-white">
                            Edit Categories
                          </h2>
                        </div>
                      </div>
                      <div className="flex border-b py-10 bg-black justify-around">
                        <div className="flex items-center">
                          <h2 className="font-bold text-white">
                            {serviceData.catering_name}
                          </h2>
                        </div>
                        <div className="flex flex-col">
                          {foodCategoryNames.map((data, id) => {
                            return (
                              <div key={id} className="flex">
                                <h2 className="text-white">{data}</h2>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center">
                          <h2 className="font-bold text-white">
                            <button className="px-5 py-2 bg-red-700 rounded-lg">
                              {" "}
                              Edit Categories
                            </button>
                          </h2>
                        </div>
                      </div>
                      {serviceData.photograpy_status && (
                        <>
                          <div className="flex border-b py-10 bg-black justify-around">
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                {serviceData.photography_name}
                              </h2>
                            </div>
                            <div className="flex flex-col">
                              {photographyCategoryNames.map((data, id) => {
                                console.log(data);
                                return (
                                  <div key={id} className="flex justify-center">
                                    <h2 className="text-white">{data}</h2>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                <button className="px-5 py-2 bg-red-700 rounded-lg">
                                  {" "}
                                  Edit Categories
                                </button>
                              </h2>
                            </div>
                          </div>
                        </>
                      )}

                      {serviceData?.decoration_status && (
                        <>
                          <div className="flex border-b py-10 bg-black justify-around">
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                {serviceData.decoration_name}
                              </h2>
                            </div>
                            <div className="flex flex-col">
                              {decorationCategoryNames.map((data, id) => {
                                console.log(data);
                                return (
                                  <div key={id} className="flex justify-center">
                                    <h2 className="text-white">{data}</h2>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                <button className="px-5 py-2 bg-red-700 rounded-lg">
                                  {" "}
                                  Edit Categories
                                </button>
                              </h2>
                            </div>
                          </div>
                        </>
                      )}
                      {serviceData.stage_status && (
                        <>
                          <div className="flex border-b py-10 bg-black justify-around">
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                {serviceData.stage_name}
                              </h2>
                            </div>
                            <div className="flex flex-col">
                              {stageCategoryNames.map((data, id) => {
                                console.log(data);
                                return (
                                  <div key={id} className="flex justify-center">
                                    <h2 className="text-white">{data}</h2>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                <button className="px-5 py-2 bg-red-700 rounded-lg">
                                  {" "}
                                  Edit Categories
                                </button>
                              </h2>
                            </div>
                          </div>
                        </>
                      )}
                      {serviceData.vehicle_status && (
                        <>
                          <div className="flex  py-10 bg-black justify-around">
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                {serviceData.vehicle_name}
                              </h2>
                            </div>
                            <div className="flex flex-col">
                              {vehicleCategoryNames.map((data, id) => {
                                console.log(data);
                                return (
                                  <div key={id} className="flex justify-center">
                                    <h2 className="text-white">{data}</h2>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex items-center">
                              <h2 className="font-bold text-white">
                                <button className="px-5 py-2 bg-red-700 rounded-lg">
                                  {" "}
                                  Edit Categories
                                </button>
                              </h2>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ):<>
              <div className="flex h-80   items-center"> <div className="flex gap-10 items-center flex-col">
              <h2 className="text-3xl font-bold">"No Services Added"</h2>
          <Link to={"/manager/services"}><button className="text-xl text-center bg-green-700 rounded-lg py-2 px-5">Select Services</button></Link>       </div></div></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedServices;
