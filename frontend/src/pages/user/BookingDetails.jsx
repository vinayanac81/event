import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Url } from "../../config/BaseUrl";

const BookingDetails = () => {
  const { id } = useParams();
  const [details, setdetails] = useState({});
  const [stageService, setstageService] = useState(false);
  const [starterService, setstarterService] = useState(false);
  const [vehicleService, setvehicleService] = useState(false);
  const [filterData, setfilterData] = useState([]);
  let stageIndex;
  let starterIndex;
  console.log(vehicleService);
  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${Url}/booking-details/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        console.log(data);
        setfilterData(data.data.form[0].items[0].categories);
        // console.log(data.data[0].form[0].items[0].categories);
        setdetails(data.data.form[0]);
        // console.log(data.data.form[0]);
        let find = data.data.form[0].items[0].categories;
        // console.log(data.data.form[0].items[0].categories[0]);
        // console.log(find);
        // console.log(stageService);
        // console.log(filterData);

        stageIndex = find.filter((item) => item.category_name === "Stage");
        starterIndex = find.findIndex(
          (item) => item.category_name === "Starter"
        );
        let vehicleIndex = find.findIndex(
          (item) => item.category_name === "Vehicle"
        );
        if (stageIndex != -1) {
          setstageService(true);
        }
        if (starterIndex != -1) {
          setstarterService(true);
        }
        if (vehicleIndex != -1) {
          setvehicleService(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div className="w-full p-14 flex">
      <div className="w-full flex flex-col bg-indigo-900">
        <div className="flex w-full justify-center py-3 text-white font-bold text-2xl">
          Details Page
        </div>
        <div className="flex w-full">
          <div className="w-[50%] flex justify-center px-10 py-10">
            <div className="w-[60%] px-4 py-4 text-white  flex flex-col  bg-gray-600 rounded-md">
              <h2 className="pb-3 flex justify-center">
                Your Personal Details
              </h2>
              <h2 className="pb-3">
                Name :
                <span className="pl-1">
                  {" "}
                  {details.formName
                    ? details.formName.charAt(0).toUpperCase() +
                      details.formName.slice(1)
                    : details.formName}
                </span>
              </h2>
              <h2 className="pb-3">
                Email :
                <span className="pl-1">
                  {" "}
                  {details.formEmail
                    ? details.formEmail.charAt(0).toUpperCase() +
                      details.formEmail.slice(1)
                    : details.formEmail}
                </span>
              </h2>
              <h2 className="pb-3">
                Number :<span className="pl-1"> {details.formMobile}</span>
              </h2>
              <h2 className="pb-3">
                Address :
                <span className="pl-1">
                  {" "}
                  {details.address
                    ? details.address.charAt(0).toUpperCase() +
                      details.address.slice(1)
                    : details.address}
                </span>
              </h2>
              <h2 className="pb-3">
                Pincode :<span className="pl-1"> {details.pin}</span>
              </h2>
              <h2 className="pb-3">
                Place :
                <span className="pl-1">
                  {" "}
                  {details.place
                    ? details.place.charAt(0).toUpperCase() +
                      details.place.slice(1)
                    : details.place}
                </span>
              </h2>
              <h2 className="pb-3">
                District :
                <span className="pl-1">
                  {" "}
                  {details.district
                    ? details.district.charAt(0).toUpperCase() +
                      details.district.slice(1)
                    : details.district}
                </span>
              </h2>
              <h2 className="pb-3">
                State :
                <span className="pl-1">
                  {" "}
                  {details.state
                    ? details.state.charAt(0).toUpperCase() +
                      details.state.slice(1)
                    : details.state}
                </span>
              </h2>
            </div>
          </div>
          <div className="w-[50%] flex justify-center   px-10 py-10">
            <div className="w-[60%] px-4 py-4  text-white  flex flex-col  bg-gray-600 rounded-md">
              <h2 className="pb-3 flex justify-center">Your Booking Details</h2>
              <h2 className="pb-3">
                Payment Status :
                <span className="pl-1">
                  {" "}
                  {details.status
                    ? details.status.charAt(0).toUpperCase() +
                      details.status.slice(1)
                    : details.status}
                </span>
              </h2>
              <h2 className="pb-3">
                Amount Payed :
                <span className="pl-1"> {details.totalPrice}</span>
              </h2>
              <h2 className="pb-3">
                Event Date :
                <span className="pl-1">
                  {" "}
                  {details.event_date
                    ? details.event_date.charAt(0).toUpperCase() +
                      details.event_date.slice(1)
                    : details.event_date}
                </span>
              </h2>
              <h2 className="pb-3">
                Event Type :
                <span className="pl-1">
                  {" "}
                  {details.type
                    ? details.type.charAt(0).toUpperCase() +
                      details.type.slice(1)
                    : details.type}
                </span>
              </h2>
              <h2 className="pb-3">
                Event Time :
                <span className="pl-1">
                  {" "}
                  {details.time
                    ? details.time.charAt(0).toUpperCase() +
                      details.time.slice(1)
                    : details.time}
                </span>
              </h2>
              <h2 className="pb-3">
                Count of People :<span className="pl-1">{details.count}</span>
              </h2>
              <h2 className="pb-3">
                Booking Date :
                <span className="pl-1">
                  {" "}
                  {details.date
                    ? details.date.charAt(0).toUpperCase() +
                      details.date.slice(1)
                    : details.date}
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="w-[77%] mx-auto flex items-center flex-col pb-5">
          <h2 className="text-2xl pb-5 text-white font-bold">
            Selected Services
          </h2>
          {stageService && (
            <>
              <div className="w-full text-white font-bold text-2xl items-center  flex-col p-4 bg-gray-600 rounded-md flex">
                <h2 className="pb-4">Stage Service</h2>
                <div className="flex w-full pb-5   justify-evenly">
                  <div className="w-[30%]  flex justify-center">
                    <h2>Image</h2>
                  </div>
                  <div className="w-[30%] flex justify-center">
                    <h2>Size</h2>
                  </div>
                  <div className="w-[30%] flex justify-center">
                    <h2>Price</h2>
                  </div>
                </div>
                {filterData
                  .filter((item) => item.category_name === "Stage")
                  .map((data) => {
                    return (
                      <>
                        <div className="flex w-full pb-5   justify-evenly">
                          <div className="w-[30%]  flex justify-center">
                            <img src={data.image} alt="" />
                          </div>
                          <div className="w-[30%] flex items-center justify-center">
                            <h2>{data.size}</h2>
                          </div>
                          <div className="w-[30%] flex items-center justify-center">
                            <h2>{data.price}</h2>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </>
          )}
          {starterService && (
            <>
              <div className="w-full text-white mt-4 font-bold text-2xl items-center  flex-col p-4 bg-gray-600 rounded-md flex">
                <h2 className="pb-4">Starter Service</h2>
                <div className="flex w-full pb-5   justify-evenly">
                  <div className="w-[30%]  flex justify-center">
                    <h2>Image</h2>
                  </div>

                  <div className="w-[30%] flex justify-center">
                    <h2>Quantity</h2>
                  </div>
                  <div className="w-[30%] flex justify-center">
                    <h2>Total Amount</h2>
                  </div>
                </div>
                {filterData
                  .filter((item) => item.category_name === "Starter")
                  .map((data) => {
                    return (
                      <>
                        <div className="flex w-full pb-5   justify-evenly">
                          <div className="w-[30%]  flex justify-center">
                            <img src={data.image} alt="" />
                          </div>
                          <div className="w-[30%] flex items-center justify-center">
                            <h2>{data.quantity}</h2>
                          </div>
                          <div className="w-[30%] flex items-center justify-center">
                            <h2>{data.price}</h2>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </>
          )}
          {vehicleService && (
            <>
              <div className="w-full text-white mt-4 font-bold text-2xl items-center  flex-col p-4 bg-gray-600 rounded-md flex">
                <h2 className="pb-4">Vehicle Service</h2>
                <div className="flex w-full pb-5   justify-evenly">
                  <div className="w-[30%]  flex justify-center">
                    <h2>Image</h2>
                  </div>

                  <div className="w-[30%] flex justify-center">
                    <h2>Quantity</h2>
                  </div>
                  <div className="w-[30%] flex justify-center">
                    <h2>Total Amount</h2>
                  </div>
                </div>
                {filterData
                  .filter((item) => item.category_name === "Vehicle")
                  .map((data) => {
                    return (
                      <>
                        <div className="flex w-full pb-5   justify-evenly">
                          <div className="w-[30%]  flex justify-center">
                            <img src={data.image} alt="" />
                          </div>
                          <div className="w-[30%] flex items-center justify-center">
                            <h2>{data.quantity}</h2>
                          </div>
                          <div className="w-[30%] flex items-center justify-center">
                            <h2>{data.price}</h2>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default BookingDetails;
