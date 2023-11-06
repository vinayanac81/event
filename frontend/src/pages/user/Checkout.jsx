import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Url } from "../../config/BaseUrl";
// import SweetAlert2 from "react-sweetalert2";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const Checkout = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const [time, setTime] = useState("00:00");
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [pincode, setpincode] = useState("");
  const [district, setdistrict] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [state, setstate] = useState("");
  const [place, setplace] = useState("");
  const [countOfPeople, setcountOfPeople] = useState("");
  const [eventType, seteventType] = useState("");
  const [cartList, setcartList] = useState([]);
  const [cartLength, setcartLength] = useState(0);
  const [price, setprice] = useState("");
  const handleTime = (e) => {
    // console.log(e.target.value);
    setTime(e.target.value);
  };

  const checkoutDetails = {
    startDate,
    time,
    name,
    mobile,
    pincode,
    district,
    email,
    address,
    state,
    place,
    countOfPeople,
    eventType,
    price,
  };
  console.log(checkoutDetails);
  const fetchCartList = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${Url}/get-cart-list`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      setcartList(data.cart_list.categories);
      // console.log(data.cart_list.categories.length);
      // console.log(data.cart_list.categories);
      setcartLength(data.cart_list.categories.length);
      // console.log(cartLength);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartList();
  }, []);
  const handleOpenRazorpay = async (data) => {
    console.log(data.id);
    let token;
    const options = {
      key: "rzp_test_mn6BBcws8w4dnR",
      amount: Number(data.amount),
      currency: data.currency,
      name: "EVENT TECH",
      description: "Nothing",
      order_id: data.id,
      handler: async (response) => {
        console.log(response);
        console.log("1");
        token = localStorage.getItem("token");
        await axios
          .post(
            `${Url}/add-event/${response.razorpay_order_id}?manager=${id}`,
            { checkoutDetails },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then(async (res) => {
            if (res.data.success) {
              token = localStorage.getItem("token");
              await axios
                .post(
                  `${Url}/verify?manager=${id}`,
                  { response },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((response) => {
                  if (response.data.status) {
                    console.log(response.data);
                    toast.success("Payment Successfully");
                    setTimeout(() => {
                      navigate("/");
                    }, 3000);
                  } else {
                    toast.error(response.data.message);
                  }
                });
            } else {
              toast.error("something error");
            }
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handlePayment = async (amount) => {
    window.scroll(0, 0);
    setprice(amount);
    let totalAmount = amount;
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${Url}/orders`,
        { totalAmount },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        handleOpenRazorpay(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = cartList.reduce((acc, curr) => acc + curr.total_price, 0);
  const totalItem = cartList.reduce((acc, curr) => acc + curr.quantity, 0);
  // console.log('total: ', {totalPrice,totalItem} )
  let subTotal = totalPrice / 2 + 10;
  // console.log(subTotal);
  console.log(name, mobile, pincode, district);
  return (
    <div className="w-full flex bg-slate-700 text-black font-bold">
      <div className="w-[50%]  flex  md:pt-20 flex-col  items-center ">
        <div className="w-[90%] pb-10 mb-10 p-10 rounded-md flex-col drop-shadow-2xl  flex bg-gray-200 ">
          <h2 className="pb-5">Your Details</h2>
          <div className="flex  w-full">
            <div className="w-[50%] pb-2 flex flex-col">
              <label className="pb-2" htmlFor="name">
                NAME
              </label>
              <input
                className="p-2 w-[90%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                name="name"
              />
              <label className="py-2" htmlFor="name">
                MOBILE
              </label>
              <input
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
                className="p-2 w-[90%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                type="text"
                id="name"
                name="name"
              />
              <label className="py-2" htmlFor="name">
                PINCODE
              </label>
              <input
                className="p-2 w-[90%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                type="text"
                id="name"
                name="name"
                value={pincode}
                onChange={(e) => setpincode(e.target.value)}
              />
              <label className="py-2" htmlFor="name">
                DISTRICT
              </label>
              <select
                className="p-2 w-[90%] drop-shadow-lg shadow-md rounded-md outline-none text-black'"
                name="district"
                id="district"
                value={district}
                onChange={(e) => setdistrict(e.target.value)}
              >
                <option value="select">Select District</option>
                <option value="kasargod">Kasargod</option>
                <option value="kannur">Kannur</option>
                <option value="wayanad">Wayanad</option>
                <option value="kozhikode">Kozhikode</option>
                <option value="malappuram">Malappuram</option>
                <option value="palakkad">Palakkad</option>
                <option value="thrissur">Thrissur</option>
                <option value="idukki">Idukki</option>
                <option value="ernamkulam">Ernamkulam</option>
                <option value="kollam">Kollam</option>
              </select>
            </div>
            <div className="w-[50%] pb-2 flex flex-col">
              <label className="pb-2" htmlFor="name">
                EMAIL
              </label>
              <input
                className="p-2 drop-shadow-lg shadow-md w-[96%] rounded-md outline-none text-black"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                id="email"
                name="email"
              />
              <label className="py-2" htmlFor="name">
                ADDRESS
              </label>
              <input
                className="p-2 w-[96%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                id="name"
                name="name"
              />
              <label className="py-2" htmlFor="name">
                STATE
              </label>
              <select
                className="p-2 w-[96%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                name="state"
                value={state}
                onChange={(e) => setstate(e.target.value)}
                id="state"
              >
                <option value="select">Select State</option>
                <option value="kerala">Kerala</option>
              </select>
              <label className="py-2" htmlFor="name">
                PLACE
              </label>
              <input
                className="p-2 w-[96%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                type="text"
                value={place}
                onChange={(e) => setplace(e.target.value)}
                id="name"
                name="name"
              />
            </div>
          </div>
        </div>
        <div className="w-[90%] p-10 mb-20 rounded-md flex-col drop-shadow-2xl  flex bg-gray-200 ">
          <h2 className="pb-5">Booking Details</h2>
          <div className="flex  w-full">
            <div className="w-[50%] pb-2 flex flex-col">
              <label className="pb-2" htmlFor="name">
                EVENT DATE
              </label>
              <DatePicker
                className="p-2 w-[90%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                selected={startDate}
                dateFormat="dd-MM-yyyy"
                onChange={(date) => setStartDate(date)}
              />
              <label className="py-2" htmlFor="name">
                COUNT OF PEOPLE
              </label>
              <input
                placeholder="enter count of people"
                value={countOfPeople}
                onChange={(e) => setcountOfPeople(e.target.value)}
                className="p-2 w-[90%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="w-[50%] pb-2 flex flex-col">
              <label className="pb-2" htmlFor="name">
                EVENT TIME
              </label>
              <input
                className="p-2 drop-shadow-lg shadow-md w-[96%] rounded-md outline-none text-black"
                type="time"
                value={time}
                required
                placeholder="Time"
                onChange={(event) => handleTime(event)}
                id="time"
                name="time"
              />
              <label className="py-2" htmlFor="name">
                EVENT_TYPE
              </label>
              <select
                className="p-2 w-[96%] drop-shadow-lg shadow-md rounded-md outline-none text-black"
                name="state"
                id="state"
                value={eventType}
                onChange={(e) => seteventType(e.target.value)}
              >
                <option value="select">Select Event Type</option>
                <option value="wedding">Wedding</option>
                <option value="reception">Reception</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%]  fle   justify-center md:pt-20 bg-slate-700">
        <div className="w-[90%] items-center p-10 mx-auto flex-col flex  mb-20 rounded-md  drop-shadow-2xl   bg-gray-200 ">
          <div className="w-[75%] bg-white p-3">
            <div className="w-full pb-10 flex justify-between">
              <h2>Subtotal</h2>
              <h2>{subTotal}</h2>
            </div>
            <div className="w-full pb-10 flex justify-between">
              <h2>Gst</h2>
              <h2>10</h2>
            </div>
            <div className="w-full pb-10 flex justify-between">
              <h2>Total</h2>
              <h2>{subTotal}</h2>
            </div>
            <h2 className="pb-8">About payment</h2>
            <h2 className=" font-bold text-slate-500 pb-8">
              For Booking time, Your Advance Payment have to only paying 50% of
              the total amount. And you must need payment after the event
              programme.
            </h2>
          </div>
          <div className="w-[90%] pb-2 pt-5">
            <button
              onClick={() => handlePayment(subTotal)}
              className="w-full bg-black  text-white py-2 rounded-md justify-items-end"
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
