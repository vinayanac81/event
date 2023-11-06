import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/admin/LeftLayout";
import axios from "axios";
import { AdminUrl } from "../../config/BaseUrl";
import toast from "react-hot-toast";

const AdminApprovel = () => {
  const [exist, setexist] = useState(false);
  const [approvedManagers, setapprovedManagers] = useState([]);
  const getApprovedManagers = async () => {
    const result = await axios.get(`${AdminUrl}/approvedManagers`);
    if (result.data.noExist) {
      toast(result.data.msg);
      setexist(false);
    } else {
      toast(result.data.msg);
      setexist(true);
      setapprovedManagers(result.data.approved);
    }
  };
  useEffect(() => {
    getApprovedManagers();
  }, []);
  return (
    <div>
      <div className="w-full h-[91vh] flex bg-slate-500">
        <div className="w-[20%] h-full bg-slate-950">
          <LeftLayout name="approvel" />
        </div>
        <div className="w-[80%] bg-slate-700">
          {exist ? (
            <>  <div className="flex flex-col">
            <div className="flex justify-center h-[20vh] items-center">
              <h2 className="text-4xl font-bold">Approved Managers List</h2>
            </div>
            <div className="w-full flex px-4  justify-center">
              <div className="w-full flex">
                <table className="table-auto   w-full">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company Name</th>
                      <th>Number</th>
                      <th>Details</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {approvedManagers.map((manager, id) => {
                      return (
                        <>
                          <tr className="text-center ">
                            <td key={id} className="py-  bg-slate-950 mb-2">
                              <img
                                className="mt-3 h-10  mx-auto w-10 rounded bg-white"
                                src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png"
                                alt=""
                              />
                            </td>
                            <td className="py-4">{manager.name}</td>
                            <td className="py-4">{manager.email}</td>
                            <td>{manager.company_name}</td>
                            <td className="py-4">{manager.mobile}</td>
                            <td>
                              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:text-slate-800 font-bold">
                                View
                              </button>
                            </td>
                            <td
                              onClick={() =>
                                handleBlock(manager._id, manager.block)
                              }
                            >
                              {" "}
                              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:text-slate-800 font-bold">
                                {manager.block ? "Unblock":"Block"}
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div></>
          ) : (
            <>
              <div className="flex h-full text-4xl font-bold items-center justify-center">
                NO APPROVED MANAGERS
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApprovel;
