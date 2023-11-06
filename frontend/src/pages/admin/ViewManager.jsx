import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminUrl } from "../../config/BaseUrl";
import axios from "axios";
import LeftLayout from "../../components/admin/LeftLayout";

const ViewManager = () => {
  const [details, setdetails] = useState({});
  const { id } = useParams();
  const fetchDeatils = async (id) => {
    const { data } = await axios.get(`${AdminUrl}/managers/view-manager/${id}`);
    console.log(data.data[0]);
    setdetails(data.data[0]);
  };
  useEffect(() => {
    fetchDeatils(id);
  }, [id]);
  return (
    <div>
      <div className="w-full h-[91vh] flex bg-slate-500">
        <div className="w-[20%] h-full bg-slate-950">
          <LeftLayout name="managers" />
        </div>
        <div className="w-[80%] bg-slate-700">
          <div className="flex flex-col w-100">
            <div className="flex w-full justify-center p-10 text-4xl font-bold">
              {" "}
              <h2>Manager Detail</h2>
            </div>
            <div className="flex flex-col w-[60%] rounded shadow-md drop-shadow-md bg-slate-800 justify-center  mx-auto">
              <div className="flex justify-between  border-b">
                {" "}
                <div className="flex text-white py-3 px-4 gap-3 flex-col">
                  <h2 className="text-bold text-xl">{details.name}</h2>
                  <h2>{details.email}</h2>
                </div>
                <div className="flex pr-4 text-white items-center">
                  <img src="" alt="Profile" />
                </div>
              </div>
              <div className="flex justify-between  border-b">
                {" "}
                <div className="flex text-white py-3 px-4 gap-3 flex-col">
                  <h2 className="text-bold text-xl">Mobile</h2>
                </div>
                <div className="flex text-white pr-3 items-center">
                  <h2>{details.mobile}</h2>
                </div>
              </div>
              <div className="flex justify-between  border-b">
                {" "}
                <div className="flex text-white py-3 px-4 gap-3 flex-col">
                  <h2 className="text-bold text-xl">Company Name</h2>
                </div>
                <div className="flex text-white pr-3 items-center">
                  <h2>{details.company_name}</h2>
                </div>
              </div>
              <div className="flex justify-between  border-b">
                {" "}
                <div className="flex text-white py-3 px-4 gap-3 flex-col">
                  <h2 className="text-bold text-xl">Address</h2>
                </div>
                <div className="flex text-white pr-3 items-center">
                  <h2>{details.address}</h2>
                </div>
              </div>
              <div className="flex justify-between ">
                {" "}
                <div className="flex text-center text-white py-3 px-4 gap-3 flex-col">
                  <h2 className="text-bold text-xl">Adhaar</h2>
                  <div className="w-80 h-48">
                    {" "}
                    <img
                      className="h-full w-full"
                      src={details.adhaar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col text-white py-3 px-4 gap-3  pr-3 items-center">
                  <h2 className="text-bold text-xl">License or VoterId</h2>
                  <div className="w-80 h-48">
                    <img
                      className="w-full h-full"
                      src={details.license_or_voterId}
                      alt=""
                    />
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

export default ViewManager;
