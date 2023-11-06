import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/admin/LeftLayout";
import axios from "axios";
import { AdminUrl } from "../../config/BaseUrl";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [exist, setexist] = useState(false);
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);
  const getUsers = async () => {
    const result = await axios.get(`${AdminUrl}/users`);
    console.log(result);
    if (result.data.noExist) {
      setloading(false);
      setexist(false);
    } else {
      setloading(false);
      setexist(true);
      setusers(result.data.users);
    }
  };
  const handleAccess = async (id, access) => {
    console.log(id, access);
    try {
      axios
        .put(`${AdminUrl}/accessManage`, {
          id: id,
          block: access,
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.msg);
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  // console.log(users);
  return (
    <div>
      <div className="w-full h-[91vh] flex bg-slate-500">
        <div className="w-[20%] h-full bg-slate-950">
          <LeftLayout name="users" />
        </div>
        <div className="w-[80%] bg-slate-700">
          {loading ? (
            <div className="flex h-full text-4xl font-bold items-center justify-center">
              Loading.....
            </div>
          ) : (
            <>
              {" "}
              {exist ? (
                <>
                  <div className="flex flex-col">
                    <div className="flex justify-center h-[20vh] items-center">
                      <h2 className="text-4xl font-bold">User List</h2>
                    </div>
                    <div className="w-full flex px-4  justify-center">
                      <div className="w-full flex">
                        <table className="table-auto   w-full">
                          <thead>
                            <tr>
                              <th>Profile</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Number</th>
                              <th>Access</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {users.map((user, id) => {
                              return (
                                <>
                                  <tr className="text-center ">
                                    <td
                                      key={id}
                                      className="py-  bg-slate-950 mb-2"
                                    >
                                      <img
                                        className="mt-3 h-10  mx-auto w-10 rounded bg-white"
                                        src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png"
                                        alt=""
                                      />
                                    </td>
                                    <td className="py-4">{user.name}</td>
                                    <td className="py-4">{user.email}</td>
                                    <td className="py-4">{user.mobile}</td>
                                    <td
                                      onClick={() =>
                                        handleAccess(user._id, user.block)
                                      }
                                      className="cursor-pointer py-4"
                                    >
                                      {user.block ? "Unblock" : "Block"}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
