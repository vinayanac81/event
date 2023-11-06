import React, { useState } from 'react'
import userLogin from "../../assets/image/userSignup.jpg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ManagerUrl } from '../../config/BaseUrl';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getManagerData } from '../../redux/ManagerInfo';
const ManagerLogin = () => {
 const navigate= useNavigate()
 const dispatch=useDispatch()
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });
      const handleChange=(e)=>{
        const {name,value}=e.target
        setLoginData((pre)=>{
          return{
            ...pre,[name]:value
          }
        })
      }
      const handleSubmit=async(e)=>{
        e.preventDefault()
        const result=await axios.post(`${ManagerUrl}/login`,loginData)
        console.log(result);
        if(result.data.noExist){
          toast.error(result.data.msg)
      navigate("/manager/signup")
        }else if(result.data.passwordError){
          toast.error(result.data.msg)
          setLoginData({
            email:loginData.email,
            password:""
          })
          // navigate("/manager")
        }else if(result.data.block){
          toast.error(result.data.msg)
          navigate("/manager/signup")
        }
        else if(result.data.notApproved){
          toast.error(result.data.msg)
          setLoginData({
            email:loginData.email,
            password:""
          })
          // navigate("/manager")
        }else{
          console.log(result.data);
          toast.success(result.data.msg)
          dispatch(getManagerData(result.data.manager))
          navigate("/manager/dashboard")
          
          localStorage.setItem('manager-token',result.data.token)

        }
      }
  return (
    <div className='py-16'>
    <div className="p-6 md:p-9 bg-slate-800 h-[100vh]">
      <div className="flex items-center justify-center">
        <div id="recaptcha-container" />
        <div className="w-1/2 h-[80vh] px-10">
          <img src={userLogin} className="h-full rounded w-full" alt="" />
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
                  value={loginData.email}
                  onChange={handleChange}
                  className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                />
              </div>

              <div className="px-4 py-4">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                />
              </div>
              <div className="w-full flex px-4 py-4 justify-center">
                <button className="text-center hover:bg-orange-600 text-slate-800 font-bold bg-orange-500 px-14 py-2 rounded">
                  Login
                </button>
              </div>
              <div className="w-full flex justify-center">
                <p className='text-lg '>Are you a new manager?<Link to={"/manager/signup"} className='ps-3 text-slate-900 hover:text-black text-xl cursor-pointer font-bold'>Signup</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ManagerLogin