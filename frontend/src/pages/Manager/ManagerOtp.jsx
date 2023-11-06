import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userSignup from "../../assets/image/userSignup.jpg";
import OtpInput from "otp-input-react";
import axios from "axios";
import { ManagerUrl } from "../../config/BaseUrl";
import toast from "react-hot-toast";
const ManagerOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter != 0) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
    }
  }, [counter]);
  const submitOtp = (e) => {
    e.preventDefault();
    try {
      const code = otp;
      console.log(code);
     window.confirmationResult
        .confirm(code)
        .then((result) => {
          if (result) {
            axios
              .post(`${ManagerUrl}/otp`)
              .then((res) => {
                if (res.data.success) {
                  toast.success(res.data.msg);
                  setTimeout(()=>{
                    navigate("/manager")
                  },4000)
                 
                } else {
                  toast.error("Something went wrong.")
                }
              })
              .catch((err) => {
                console.log("Something went wrong");
              });
          } else {
            console.log("incorrect code");
          }
          // ...
        })
        .catch((error) => {
          console.log("incorrect code, enter correct code");
          setTimeout(() => {
            navigate("/manager/otp")
          }, 3000);
          // User couldn't sign in (bad verification code?)
          // ...
        });
    } catch (error) {
      console.log("expired code");
      console.log(error);
    }
  };
  return (
    <div className='py-16'>
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
                        //   onClick={resendOtp}
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
                  <button
                    onClick={submitOtp}
                    className="bg-red-600 px-10 py-2 hover:bg-red-800 transition-all text-slate-900 font-bold"
                  >
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

export default ManagerOtp;
