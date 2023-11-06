import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/admin/LeftLayout";
import { AdminUrl } from "../../config/BaseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminManagers = () => {
  const [exist, setexist] = useState(false);
  const [managers, setmanagers] = useState([]);
  console.log(managers);
  const getManagers = async () => {
    try {
      const result = await axios.get(`${AdminUrl}/managers`);
      console.log(result);
      if (result.data.noExist) {
        toast(result.data.msg);
        setexist(false);
      } else {
        setmanagers(result.data.managers);
        setexist(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApproval = async (id, status) => {
    console.log(id, status);
    const result = await axios.put(`${AdminUrl}/manageManagerApproval`, {
      id: id,
      status: status,
    });
    toast(result.data.msg)
    setTimeout(()=>{
      location.reload()
    },[3000])
    
  };
  useEffect(() => {
    getManagers();
  }, []);
  return (
    <div>
      <div className="w-full h-[91vh] flex bg-slate-500">
        <div className="w-[20%] h-full bg-slate-950">
          <LeftLayout name="managers" />
        </div>
        <div className="w-[80%] bg-slate-700">
          {exist ? (
            <>
              {" "}
              <div className="flex flex-col">
                <div className="flex justify-center h-[20vh] items-center">
                  <h2 className="text-4xl font-bold">Manager List</h2>
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
                          <th>Approve</th>
                          <th>Reject</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {managers.map((manager, id) => {
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
                                 <Link to={`/admin/managers/${manager._id}`}> <button className="bg-orange-500 text-white px-4 py-2 rounded hover:text-slate-800 font-bold">
                                    View
                                  </button>
                                  </Link>
                                </td>
                                <td
                                  onClick={() =>
                                    handleApproval(manager._id, "approval")
                                  }
                                  className="cursor-pointer py-4"
                                >
                                  {" "}
                                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:text-slate-800 font-bold">
                                    Approve
                                  </button>
                                </td>
                                <td
                                  onClick={() =>
                                    handleApproval(manager._id, "reject")
                                  }
                                >
                                  {" "}
                                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:text-slate-800 font-bold">
                                    Reject
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
              </div>
            </>
          ) : (
            <>
              <div className="flex h-full text-4xl font-bold items-center justify-center">
                NO MANAGERS REQUEST FOR APPROVEL
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagers;
