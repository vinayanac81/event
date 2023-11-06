import axios from "axios";
import React, { useEffect, useState } from "react";
import { Url } from "../../config/BaseUrl";
import BounceLoader from "react-spinners/BounceLoader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RandomColorPicker } from "../../config/RandomColor";
const SelectedService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [color, setcolor] = useState("");
  const [loading, setloading] = useState(false);
  const [catering, setcatering] = useState(false);
  const [starter, setstarter] = useState(false);
  const [starterData, setstarterData] = useState([]);
  const [starterChecked, setstarterChecked] = useState([]);
  const [stage, setstage] = useState(false);
  const [stageData, setstageData] = useState([]);
  const [stageChecked, setstageChecked] = useState([]);
  const [decoration, setdecoration] = useState(false);
  const [decorationData, setdecorationData] = useState([]);
  const [decorationChecked, setdecorationChecked] = useState([]);
  const [photograpy, setphotograpy] = useState(false);
  const [photograpyData, setphotograpyData] = useState([]);
  const [photograpyChecked, setphotograpyChecked] = useState([]);
  const [vehicle, setvehicle] = useState(false);
  const [vehicleData, setvehicleData] = useState([]);
  const [vehicleChecked, setvehicleChecked] = useState([]);
  const fetchData = async () => {
    try {
      setloading(true);
      setcolor(RandomColorPicker());
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${Url}/selected-service`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setloading(false);
      if (data.tokenExp === true || data.noToken === true) {
        localStorage.clear();
        navigate("/login");
      } else if (data.success) {
        setstage(data.stageSelected);
        setcatering(data.cateringSelected);
        setphotograpy(data.photograpySelected);
        setvehicle(data.vehicleSelected);
        setdecoration(data.decorationSelected);
        if (data.isStarter === true) {
          console.log(data.isStarter);
          setstarter(data.isStarter);
          setstarterData(data.starter);
        }
        setstageData(data.stageData);
        setdecorationData(data.decorationData);
        setphotograpyData(data.photograpyData);
        setvehicleData(data.vehicleData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleStageCheckBox = async (
    e,
    id,
    image,
    size,
    price,
    category_name
  ) => {
    console.log(e, id);
    if (e === true) {
      setstageChecked([
        ...stageChecked,
        { id, category_name, image, size, price, quantity: parseInt(1) },
      ]);
    } else {
      let index = stageChecked.findIndex((item) => item.id === id);
      console.log(index);
      stageChecked.splice(index, 1);
      console.log(stageChecked);
    }
  };
  const handleDecorationCheckBox = async (
    e,
    id,
    image,
    price,
    category_name
  ) => {
    console.log(e, id);
    if (e === true) {
      setdecorationChecked([
        ...decorationChecked,
        { id, category_name, image, price, quantity: parseInt(1) },
      ]);
    } else {
      let index = decorationChecked.findIndex((item) => item.id === id);
      console.log(index);
      decorationChecked.splice(index, 1);
    }
  };
  const handleVehicleCheckBox = async (
    e,
    id,
    image,
    name,
    price,
    category_name
  ) => {
    console.log(e, id);
    if (e === true) {
      setvehicleChecked([
        ...vehicleChecked,
        { id, category_name, image, name, price, quantity: parseInt(1) },
      ]);
    } else {
      let index = vehicleChecked.findIndex((item) => item.id === id);
      console.log(index);
      vehicleChecked.splice(index, 1);
    }
  };
  const handleStarterCheckBox = async (
    e,
    _id,
    image,
    name,
    price,
    category_name
  ) => {
    console.log(e, _id);
    if (e === true) {
      setstarterChecked([
        ...starterChecked,
        { _id, category_name, image, name, price, quantity: parseInt(1) },
      ]);
      console.log(starterChecked);
    } else {
      let index = starterChecked.findIndex((item) => item._id === _id);
      console.log(index);
      starterChecked.splice(index, 1);
      console.log(starterChecked);
    }
  };
  const handleSubmit = async () => {
    console.log("Button Clicked");

    try {
      const token = localStorage.getItem("token");
      console.log(stageChecked, starterChecked);
      const { data } = await axios.post(
        `${Url}/add-to-cart`,
        { stageChecked, starterChecked, decorationChecked, vehicleChecked },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        navigate(`/cart-list/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(decorationChecked);
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
        <div className="p-4 flex md:px-14  bg-blue-300 w-full">
          <div className="flex px-10 flex-col pb-10 bg-fuchsia-200 rounded-lg w-full">
            <div className="flex justify-center pt-3">
              <h2>Selected Menu List</h2>
            </div>
            {stage && (
              <>
                <div className="flex pt-8 flex-col">
                  <div className="">Stage Service</div>
                  <div className="pt-8 w-full rounded-xl flex flex-col">
                    <div className="flex px-6 py-6 rounded-t-md bg-slate-600 w-full justify-between">
                      <h2 className="flex w-[25%] justify-center">
                        Stage photo
                      </h2>
                      <h2 className="flex w-[25%] justify-center">
                        Stage size
                      </h2>
                      <h2 className="flex w-[25%] justify-center">
                        Stage Price
                      </h2>
                      <h2 className="flex w-[25%] justify-center">Check</h2>
                    </div>

                    {stageData.map((item, id) => {
                      return (
                        <div key={id}>
                          <div className="w-full items-center rounded-b-md pb-6 justify-between bg-slate-400 px-6 py-6 flex">
                            <div className="flex w-[25%] justify-center">
                              <div className="w-20 h-20">
                                {" "}
                                <img
                                  className="w-full h-full"
                                  src={item.stage_image}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="flex w-[25%] justify-center">
                              <h2>{item.stage_size}</h2>
                            </div>
                            <div className="flex w-[25%] justify-center">
                              <h2>{item.stage_budget}</h2>
                            </div>
                            <div className="flex w-[25%]  justify-center ">
                              <div className="w-8 h-8">
                                <input
                                  onChange={(e) =>
                                    handleStageCheckBox(
                                      e.target.checked,
                                      item._id,
                                      item.stage_image,
                                      item.stage_size,
                                      item.stage_budget,
                                      "Stage"
                                    )
                                  }
                                  className="w-full h-full"
                                  type="checkbox"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
              
                </div>
              </>
            )}
            {catering && (
              <>
                <div className="flex pt-2 flex-col">
                  <div className="flex justify-center text-2xl">
                    Catering Service
                  </div>
                  {starter && (
                    <>
                      <div className="flex font-serif font-bold">Starter</div>
                      <div className="pt-2 w-full rounded-xl flex flex-col">
                        <div className="flex px-6 py-2 rounded-t-md bg-slate-600 w-full justify-between">
                          <h2 className="flex w-[25%] justify-center">
                            Starter photo
                          </h2>
                          <h2 className="flex w-[25%] justify-center">
                            Starter name
                          </h2>
                          <h2 className="flex w-[25%] justify-center">
                            Starter price
                          </h2>
                          <h2 className="flex w-[25%] justify-center">Check</h2>
                        </div>

                        {starterData.map((item, id) => {
                          console.log(item);
                          return (
                            <div key={id}>
                              <div className="w-full items-center rounded-b-md justify-between bg-slate-400 px-6 py-2 flex">
                                <div className="flex w-[25%] p-2 justify-center">
                                  <div className="w-20 ">
                                    <img
                                      className="w-full h-full"
                                      src={item.starter_image}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="flex w-[25%] justify-center">
                                  <h2>{item.starter_name}</h2>
                                </div>
                                <div className="flex w-[25%] justify-center">
                                  <h2>{item.starter_price}</h2>
                                </div>
                                <div className="flex w-[25%]  justify-center ">
                                  <div className="w-8 h-8">
                                    <input
                                      onChange={(e) =>
                                        handleStarterCheckBox(
                                          e.target.checked,
                                          item._id,
                                          item.starter_image,
                                          item.starter_name,
                                          item.starter_price,
                                          "Starter"
                                        )
                                      }
                                      className="w-full h-full"
                                      type="checkbox"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* <div className="pt-8 w-full rounded-xl flex flex-col">
              <div className="flex px-6 py-6 rounded-t-md bg-slate-600 w-full justify-between">
                <h2 className="flex w-[25%] justify-center">Stage photo</h2>
                <h2 className="flex w-[25%] justify-center">Stage size</h2>
                <h2 className="flex w-[25%] justify-center">Stage Price</h2>
                <h2 className="flex w-[25%] justify-center">Check</h2>
              </div>

              {stageData.map((item, id) => {
                return (
                  <div key={id}>
                    <div className="w-full items-center rounded-b-md pb-6 justify-between bg-slate-400 px-6 py-6 flex">
                      <div className="flex w-[25%] justify-center">
                        <img
                          className="w-full h-full"
                          src={item.stage_photo}
                          alt=""
                        />
                      </div>
                      <div className="flex w-[25%] justify-center">
                        <h2>{item.stage_size}</h2>
                      </div>
                      <div className="flex w-[25%] justify-center">
                        <h2>{item.stage_budget}</h2>
                      </div>
                      <div className="flex w-[25%]  justify-center ">
                        <div className="w-8 h-8">
                          <input
                            onChange={(e) =>
                              handleStageCheckBox(
                                e.target.checked,
                                id,
                                item.stage_photo,
                                item.stage_size,
                                item.stage_budget,
                                "Stage"
                              )
                            }
                            className="w-full h-full"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> */}
                 
                </div>
              </>
            )}
            {decoration && (
              <>
                <div className="flex pt-8 flex-col">
                  <div className="">Decoration Service</div>
                  <div className="pt-8 w-full rounded-xl flex flex-col">
                    <div className="flex px-6 py-6 rounded-t-md bg-slate-600 w-full justify-between">
                      <h2 className="flex w-[25%] justify-center">
                        Stage photo
                      </h2>
                      <h2 className="flex w-[25%] justify-center">
                        Stage size
                      </h2>
                      <h2 className="flex w-[25%] justify-center">
                        Stage Price
                      </h2>
                      <h2 className="flex w-[25%] justify-center">Check</h2>
                    </div>

                    {decorationData.map((item, id) => {
                      return (
                        <div key={id}>
                          <div className="w-full items-center rounded-b-md pb-6 justify-between bg-slate-400 px-6 py-6 flex">
                            <div className="flex w-[30%] justify-center">
                              <div className="w-20 h-20">
                                {" "}
                                <img
                                  className="w-full h-full"
                                  src={item.decoration_image}
                                  alt=""
                                />
                              </div>
                            </div>

                            <div className="flex w-[30%] justify-center">
                              <h2>{item.decoration_amount}</h2>
                            </div>
                            <div className="flex w-[30%]  justify-center ">
                              <div className="w-8 h-8">
                                <input
                                  onChange={(e) =>
                                    handleDecorationCheckBox(
                                      e.target.checked,
                                      item._id,
                                      item.decoration_image,
                                      item.decoration_amount,
                                      "Decoration"
                                    )
                                  }
                                  className="w-full h-full"
                                  type="checkbox"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                 
                </div>
              </>
            )}
            {vehicle && (
              <>
                <div className="flex pt-8 flex-col">
                  <div className="">Vehicle Service</div>
                  <div className="pt-8 w-full rounded-xl flex flex-col">
                    <div className="flex px-6 py-6 rounded-t-md bg-slate-600 w-full justify-between">
                      <h2 className="flex w-[25%] justify-center">
                        Vehicle photo
                      </h2>
                      <h2 className="flex w-[25%] justify-center">
                        Vehicle Name
                      </h2>
                      <h2 className="flex w-[25%] justify-center">
                        Vehicle Price
                      </h2>
                      <h2 className="flex w-[25%] justify-center">Check</h2>
                    </div>

                    {vehicleData.map((item, id) => {
                      return (
                        <div key={id}>
                          <div className="w-full items-center rounded-b-md pb-6 justify-between bg-slate-400 px-6 py-6 flex">
                            <div className="flex w-[25%] justify-center">
                              <div className="w-20 h-20">
                                {" "}
                                <img
                                  className="w-full h-full"
                                  src={item.vehicle_image}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="flex w-[25%] justify-center">
                              <h2>{item.vehicle_name}</h2>
                            </div>
                            <div className="flex w-[25%] justify-center">
                              <h2>{item.vehicle_amount}</h2>
                            </div>
                            <div className="flex w-[25%]  justify-center ">
                              <div className="w-8 h-8">
                                <input
                                  onChange={(e) =>
                                    handleVehicleCheckBox(
                                      e.target.checked,
                                      item._id,
                                      item.vehicle_image,
                                      item.vehicle_name,
                                      item.vehicle_amount,
                                      "Vehicle"
                                    )
                                  }
                                  className="w-full h-full"
                                  type="checkbox"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                
                </div>
              </>
            )}
             <div className="pt-8 w-full flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="py-2 px-10 bg-blue-500 rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
          </div>
         
        </div>
      )}
    </>
  );
};

export default SelectedService;
