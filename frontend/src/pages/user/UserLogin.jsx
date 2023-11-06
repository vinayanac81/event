import React, { useEffect, useState } from "react";
import userLogin from "../../assets/image/userSignup.jpg";
import axios from "axios";
import { Url } from "../../config/BaseUrl";
import { GoogleLogin } from "react-google-login";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
const UserLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(`${Url}/login`, loginData);
    if (result.data.success) {
      toast.success(result.data.msg);
      navigate("/");
      localStorage.setItem("token", result.data.token);
      // console.log(localStorage.token);
    } else if (result.data.block) {
      toast.error(result.data.msg);
      navigate("/signup");
    } else if (result.data.noUser) {
      toast.error(result.data.msg);
      navigate("/signup");
    } else {
      toast.error(result.data.msg);
      navigate("/login");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleGoogleAuth = async () => {
    try {
      window.open(`${Url}/google`, "_self");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "926525521133-9jjd2cer6uaajvemgf8jvj0ujpsb0nu6.apps.googleusercontent.com",
      });
    });
  }, []);
  const responseGoogleSuccess = async (response) => {
    try {
      const {data} = await axios({
        method: "POST",
        url: `${Url}/googlelogin`,
        data: { idToken: response.tokenId },
      });
      if (data.success) {
        toast.success("Sign in Successfullt!");
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const responseGoogleError = (response) => {
    console.log(response);
  };
  return (
    <div>
      <div className="p-6 md:p-9 bg-slate-800 h-[100vh]">
        <div className="flex items-center justify-center">
          <div id="recaptcha-container" />
          <div className="w-1/2 h-[80vh] px-10">
            <img src={userLogin} className="h-full rounded w-full" alt="" />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center py-2 bg-slate-700 h-[80vh] px-10 ">
            <div className="h-full flex flex-col justify-center items-center">
              <form onSubmit={handleSubmit} action="">
                <div className="text-center ">
                  <h1 className="text-3xl text-white font-bold py-2">
                    Pls Login Here!
                  </h1>
                </div>

                <div className="px-4 py-2">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>

                <div className="px-4 py-2">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>
                <div className="px-4 font-serif font-medium w-full hover:underline cursor-pointer hover:text-white">
                  <h2>Forgot your password?</h2>
                </div>

                <div className="w-full flex px-4 py-2 justify-center">
                  <button className="text-center hover:bg-orange-600 text-slate-800 font-bold bg-orange-500 px-14 py-2 rounded">
                    Login
                  </button>
                </div>
              </form>
              <div className="px-4 py-2 w-full">
                {" "}
                <div className=" border-b"></div>
              </div>
              <div className="w-full px-4 flex justify-center text-white font-serif py-2">
                {" "}
                <h2 className="px-6">Or use your google account</h2>
              </div>
              <div className="flex w-full px-4 justify-evenly ">
                <div
                  // onClick={handleGoogleAuth}
                  className="flex  bg-white py-2 px-4 rounded-full cursor-pointer items-center"
                >
                  {" "}
                  <GoogleLogin
                    clientId="926525521133-9jjd2cer6uaajvemgf8jvj0ujpsb0nu6.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleError}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>
              <div className="w-full py-2 px-4">
                <h2>
                  Not Register? <Link to={"/signup"}>Sign up</Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
