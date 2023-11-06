import React, { useState } from "react";

const CompanyLIstLayout = ({ onClick }) => {
  const [checkedService, setcheckedService] = useState({
    food: false,
    stage: false,
    decoration: false,
    photography: false,
    vehicle: false,
  });
  const checkService = (name) => {
    onClick(name);
    setcheckedService({
      food: false,
      stage: false,
      decoration: false,
      photography: false,
      vehicle: false,
    });
    // console.log(name);
    setcheckedService((pre) => {
      return {
        ...pre,
        [name]: true,
      };
    });
  };
  //  console.log(checkedService);
  return (
    <div className="w-full h-[94vh]  flex justify-center">
      <div className="w-full py-10 items-center flex flex-col">
        <div className="">
          {" "}
          <h2 className="font-bold text-white text-2xl">Filter by Services</h2>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full  font-bold text-white py-2">
            <input
              className="w-10"
              checked={checkedService.food}
              onChange={() => checkService("food")}
              type="radio"
              name=""
              id="food"
            />
            <label htmlFor="food">Food Service</label>
          </div>
          <div className="flex w-full  font-bold text-white py-2">
            <input
              className="w-10"
              checked={checkedService.stage}
              onChange={() => checkService("stage")}
              type="radio"
              name=""
              id="stage"
            />
            <label htmlFor="stage">Stage Service</label>
          </div>
          <div className="flex w-full font-bold text-white py-2">
            <input
              className="w-10"
              checked={checkedService.decoration}
              onChange={() => checkService("decoration")}
              type="radio"
              name=""
              id="decoration"
            />
            <label htmlFor="decoration">Decoration Service</label>
          </div>
          <div className="flex w-full  font-bold text-white py-2">
            <input
              className="w-10"
              checked={checkedService.photography}
              onChange={() => checkService("photography")}
              type="radio"
              name=""
              id="photography"
            />
            <label htmlFor="photography">Photography Service</label>
          </div>
          <div className="flex w-full  font-bold text-white py-2">
            <input
              className="w-10"
              checked={checkedService.vehicle}
              onChange={() => checkService("vehicle")}
              type="radio"
              name=""
              id="vehicle"
            />
            <label htmlFor="vehicle">Luxury Vehicle Service</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLIstLayout;
