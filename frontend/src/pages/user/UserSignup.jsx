import React, { useState } from "react";
import userSignup from "../../assets/image/userSignup.jpg";
import axios from "axios";
import { Url } from "../../config/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../assets/firebase";
const UserSignup = () => {
  const [userSignupData, setuserSignupData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserSignupData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier( 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          }
        },auth);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ki");
    try {
      const { name, number } = userSignupData;
      console.log(number);
      await axios.post(`${Url}/signup`, userSignupData).then((res) => {
        if (res.data.success) {
            console.log(res.data);
          onCaptchVerify();
          const phoneNumber = `+91${userSignupData.number}`;
        //   console.log(phoneNumber);
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                toast(res.data.msg)
              console.log(confirmationResult);
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              navigate("/otp")
              // ...
            })
            .catch((error) => {
              console.log(error);
              toast("OTP not sent")
              // Error; SMS not sent
              // ...
            });
        }else{
          toast(res.data.msg)
        }
      });
    } catch (error) {
      console.log(error);
      console.log("hy");
    }
  };
  return (
    <div>
      <div className="p-2 md:p-9 bg-slate-800 h-[91vh]">
        <div className="flex">
        <div id="recaptcha-container" />
          <div className="w-1/2 h-[80vh] px-10">
            <img src={userSignup} className="h-full rounded w-full" alt="" />
          </div>
          <div className="w-1/2 py-5 bg-slate-700 h-[80vh] px-10 ">
            <div className="h-full ">
              <form onSubmit={handleSubmit} action="">
                <div className="text-center ">
                  <h1 className="text-3xl text-white font-bold py-8">
                    Hi Welcome
                  </h1>
                </div>
                <div className="px-4 py-4">
                  <input
                    name="name"
                    value={userSignupData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="name"
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>
                <div className="px-4 py-4">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={userSignupData.email}
                    onChange={handleChange}
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>
                <div
                  className="px-4 py-4
        "
                >
                  <input
                    type="text"
                    name="number"
                    value={userSignupData.number}
                    onChange={handleChange}
                    placeholder="number"
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>
                <div className="px-4 py-4">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={userSignupData.password}
                    onChange={handleChange}
                    className="rounded p-3 hover:outline-slate-900 outline-none text-lg text-slate-700 font-bold w-full px-4"
                  />
                </div>
                <div className="w-full flex px-4 py-4 justify-center">
                  <button className="text-center hover:bg-orange-600 text-slate-800 font-bold bg-orange-500 px-14 py-2 rounded">
                    SIGN UP
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

export default UserSignup;
