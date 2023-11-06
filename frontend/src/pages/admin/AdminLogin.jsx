import React, { useState } from "react";
import adminLoginImg from "../../assets/image/userSignup.jpg";
import axios from "axios";
import { AdminUrl } from "../../config/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { getAdminStatus } from "../../redux/AdminStatus";
const AdminLogin = () => {
  const dispatch=useDispatch()
   const navigate= useNavigate()
  const [adminLogin, setadminLogin] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(adminLogin);
    axios
      .post(`${AdminUrl}`, {
        email: adminLogin.email,
        password: adminLogin.password,
      })
      .then((res) => {
        if(res.data.success){
            toast.success(res.data.msg)
            localStorage.setItem('status',true)
            navigate("/admin/dashboard")
        }else{
            toast.error(res.data.msg)
            localStorage.setItem('status',false)
            navigate("/admin")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setadminLogin((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  return (
    <div>
      <div className="p-6 md:p-9 bg-slate-800 h-[100vh]">
        <div className="flex items-center justify-center">
          <div id="recaptcha-container" />
          <div className="w-1/2 h-[80vh] px-10">
            <img src={adminLoginImg} className="h-full rounded w-full" alt="" />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center py-5 bg-slate-700 h-[80vh] px-10 ">
            <div className="h-full flex flex-col justify-center items-center">
              <form onSubmit={handleSubmit} action="">
                <div className="text-center ">
                  <h1 className="text-3xl text-white font-bold py-8">
                    Pls Login Here!
                  </h1>
                </div>

                <div className="px-4 py-4">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={adminLogin.email}
                    onChange={handleChange}
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>

                <div className="px-4 py-4">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={adminLogin.password}
                    onChange={handleChange}
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>
                <div className="w-full flex px-4 py-4 justify-center">
                  <button className="text-center hover:bg-orange-600 text-slate-800 font-bold bg-orange-500 px-14 py-2 rounded">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
