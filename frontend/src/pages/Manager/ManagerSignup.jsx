import React, { useState } from "react";
import userSignup from "../../assets/image/userSignup.jpg";
import { ImagetoBase64 } from "../../assets/image/ImageBase64";
import { ManagerUrl } from "../../config/BaseUrl";
import axios from "axios";
import { auth } from "../../assets/firebase";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from "react-hot-toast";

const ManagerSignup = () => {
  const navigate = useNavigate();
  const [managerData, setmanagerData] = useState({
    name: "",
    place: "",
    password: "",
    email: "",
    voterorlicence: "",
    aadhar: "",
    pincode: "",
    mobile: "",
    state: "",
    district: "",
    company: "",
  });
  console.log(managerData);
  const handleVoterImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);

    setmanagerData((preve) => {
      return {
        ...preve,
        voterorlicence: data,
      };
    });
  };
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setmanagerData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(managerData);
    console.log(ManagerUrl);
    try {
      await axios
        .post(`${ManagerUrl}/signup`, managerData)
        .then((res) => {
          if (res.data.success) {
           onCaptchVerify()
            const phoneNumber = `+91${managerData.mobile}`;
           
            const appVerifier = window.recaptchaVerifier;
            console.log(phoneNumber,appVerifier);
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
              .then((confirmationResult) => {
                toast.success(res.data.msg)
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                navigate("/manager/otp");
                // ...
              })
              .catch((error) => {
                console.log("otp not sent");
                console.log(error);
                // Error; SMS not sent
                // ...
              });
          }else{

          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);

    setmanagerData((preve) => {
      return {
        ...preve,
        aadhar: data,
      };
    });
  };
  return (
    <div className='py-16'>
      <div className="p-2 md:p-4 bg-slate-800 h-[91vh]">
        <div className="flex">
          <div id="recaptcha-container" />
          <div className="w-[40%] h-[86vh] px-6">
            <img src={userSignup} className="h-full rounded w-full" alt="" />
          </div>
          <div className="w-[60%] py bg-slate-700 h-[86vh] px-10 ">
            <div className="h-full w-full">
              <form onSubmit={handleSubmit} action="">
                <div className="text-center ">
                  <h1 className="text-3xl text-white font-bold py-4">
                    Hey event manager
                  </h1>
                </div>
                <div className="flex justify-between mb-6 w-full">
                  <div className="flex flex-col">
                    <label className="mb-1 font-bold" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="py-2 px-4 outline-none rounded text-slate-800 font-bold"
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={managerData.name}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1  font-bold" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="py-2 px-4 outline-none rounded text-slate-800 font-bold"
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={managerData.email}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1  font-bold" htmlFor="mobile">
                      Mobile
                    </label>
                    <input
                      className="py-2 px-4 outline-none rounded text-slate-800 font-bold"
                      type="text"
                      id="mobile"
                      name="mobile"
                      onChange={handleChange}
                      value={managerData.mobile}
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-6 w-full">
                  <div className="flex flex-col">
                    <label className="mb-2 font-bold" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="py-2 px-4 outline-none rounded text-slate-800 font-bold"
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleChange}
                      value={managerData.address}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2  font-bold" htmlFor="pin">
                      Pin code
                    </label>
                    <input
                      className="py-2 px-4 outline-none rounded text-slate-800 font-bold"
                      type="text"
                      id="pin"
                      name="pincode"
                      onChange={handleChange}
                      value={managerData.pincode}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2  font-bold" htmlFor="company">
                      Company name
                    </label>
                    <input
                      className="py-2 px-4 outline-none rounded text-slate-800 font-bold"
                      type="text"
                      id="company"
                      name="company"
                      onChange={handleChange}
                      value={managerData.comany}
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <label className="mb-2 font-bold" htmlFor="place">
                      Place
                    </label>
                    <input
                      className="py-2 px-4 outline-none rounded text-slate-800 font-bold"
                      type="text"
                      id="place"
                      name="place"
                      onChange={handleChange}
                      value={managerData.place}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2  font-bold" htmlFor="state">
                      State
                    </label>
                    <select
                      className="py-2 px-14 outline-none rounded text-slate-800 font-bold"
                      name="state"
                      id="state"
                      onChange={handleChange}
                      value={managerData.state}
                    >
                      <option value="select">Select State</option>
                      <option value="kerala">Kerala</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2  font-bold" htmlFor="district">
                      District
                    </label>
                    <select
                      className="py-2 px-14 outline-none rounded text-slate-800 font-bold"
                      name="district"
                      id="district"
                      onChange={handleChange}
                      value={managerData.district}
                    >
                      <option value="select">Select District</option>
                      <option value="malappuram">Malappuram</option>
                    </select>
                  </div>
                </div>
                <div className="flex rounded h-full mt-4  w-full">
                  <div className="flex rounded flex-col text-center font-bold text-black cursor-pointer me-6  w-[31%]">
                    <label htmlFor="aadhar" className="">
                      {" "}
                      Upload Aadhar Card
                      <div className="h-36 rounded mt-2">
                        {managerData.aadhar ? (
                          <img
                            src={managerData.aadhar}
                            className="h-full rounded w-full"
                          />
                        ) : (
                          <img
                            src="data:image/jpeg;base64,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"
                            className="h-full rounded w-full"
                            alt=""
                          />
                        )}
                      </div>
                      <input
                        type={"file"}
                        className="hidden"
                        accept="image/*"
                        id="aadhar"
                        // value={managerData.aadhar}
                        onChange={handleImage}
                      />
                    </label>
                  </div>
                  <div className="flex rounded flex-col ms-3 text-center font-bold text-black cursor-pointer me-5  w-[30%]">
                    <label htmlFor="voterorlicense" className="">
                      {" "}
                      VoterId or License
                      <div className="h-36 rounded mt-2">
                        {managerData.voterorlicence ? (
                          <img
                            src={managerData.voterorlicence}
                            className="h-full rounded w-full"
                          />
                        ) : (
                          <img
                            src="data:image/jpeg;base64,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"
                            className="h-full rounded w-full"
                            alt=""
                          />
                        )}
                      </div>
                      <input
                        type={"file"}
                        className="hidden"
                        accept="image/*"
                        // value={managerData.voterorlicence}
                        id="voterorlicense"
                        onChange={handleVoterImage}
                      />
                    </label>
                  </div>
                  <div className="flex ms-3 flex-col  w-[31%]">
                    <div className="text-center flex flex-col mt-1">
                      <label className="font-bold" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={managerData.password}
                        className="py-2 mt-4 px-4 rounded outline-none text-slate-800 font-bold"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center p-5 w-full">
                  <button className="py-2 bg-orange-600 px-20 rounded hover:bg-orange-700">
                    Signup
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

export default ManagerSignup;
