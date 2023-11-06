import React, { useEffect, useState } from "react";
import userSignup from "../../assets/image/userSignup.jpg";
import OtpInput from "otp-input-react";
import { Url } from "../../config/BaseUrl";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../assets/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const UserOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate=useNavigate()
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter != 0) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
    }
  }, [counter]);
  function onCaptchVerify() {
    if (!window.recaptchaVerifierResend) {
      window.recaptchaVerifierResend = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  }
  const resendOtp = (e) => {
    e.preventDefault();
    setCounter(30);
    axios.post(`${Url}/resend-otp`).then((response)=>{
        if(response.data.success){
          onCaptchVerify()
          const mobile = response.data.result;
          const formatPhone = `+91${mobile}`;
          const appVerifier = window.recaptchaVerifierResend;
          signInWithPhoneNumber(auth, formatPhone, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              toast(response.data.message);
            })
          .catch((error) => {
            // Error; SMS not sent
            console.log(error);
            console.log("ddd");
            // ...
          });
        }else{

        }
    })
  };
  const submitOtp = async (e) => {
    e.preventDefault();
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        try {
          if (res) {
            axios.post(`${Url}/otp`).then((response) => {
              if (response.data.success) {
                navigate("/login");
                toast.success(response.data.message);
              } else {
                navigate("/otp");
                toast.error("Something error");
              }
            });
          } else {
            console.log("err");
            toast.error("Invalid OTP");
            navigate("/signUp");
            // toast.error('Your otp is invalid,Please try again');
          }
        } catch (error) {
          console.log(error);
          toast.error("Invalid OTP");
          navigate("/signUp");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid OTP");
        navigate("/signUp");
      });
  };
//   console.log(counter);
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
              <div className="text-center ">
                <h1 className="text-3xl text-white font-bold py-8">
                  ENTER OTP
                </h1>
              </div>
              <form action="">
                <div className="pb-8 pt-20 flex justify-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container outline-none border-none text-black"
                  />
                </div>

                <div className="flex mt-10 justify-center w-full">
                  {counter === 0 ? (
                    <>
                      <button
                        onClick={resendOtp}
                        className="bg-red-600 px-10 py-2 hover:bg-red-800 transition-all text-slate-900 font-bold"
                      >
                        RESEND OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-xl text-slate-900 font-bold">{`Resend OTP in ${counter} seconds....`}</p>
                    </>
                  )}
                </div>
                <div className="flex mt-10 justify-center w-full">
                  <button onClick={submitOtp} className="bg-red-600 px-10 py-2 hover:bg-red-800 transition-all text-slate-900 font-bold">
                    VERIFY OTP
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

export default UserOtp;
