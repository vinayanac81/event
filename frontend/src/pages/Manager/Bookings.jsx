import React, { useEffect, useState } from "react";
import LeftLayout from "../../components/manager/LeftLayout";
import Table from "react-bootstrap/Table";
import { ManagerUrl } from "../../config/BaseUrl";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import { Link } from "react-router-dom";
import { RandomColorPicker } from "../../config/RandomColor";
import { useDispatch } from "react-redux";
import { getManagerData } from "../../redux/ManagerInfo";
const Bookings = () => {
 const dispatch= useDispatch()
  const [bookingdata, setbookingdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [color, setcolor] = useState("");
  const fetchBooking = async () => {
    setloading(true);
    setcolor(RandomColorPicker());
    const token = localStorage.getItem("manager-token");
    const { data } = await axios.get(`${ManagerUrl}/booking`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(data)
    dispatch(getManagerData(data.manager[0]))
    setloading(false);
    setbookingdata(data.booking[0].form);
  };
  useEffect(() => {
    fetchBooking();
  }, []);
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  let length=0
  return (
    <div className="py-16">
      <div className="w-full h-[91vh] flex bg-slate-500">
        <div className="w-[20%] h-full bg-slate-950">
          <LeftLayout name="bookings" />
        </div>
        <div className="w-[80%] relative bg-slate-700">
          {loading ? (
            <>
              <div className="sweet-loading absolute inset-0 backdrop-blur-sm  top-0 bg-opacity-60 w-full flex h-[91vh] items-center justify-center">
                <div className="flex px-4 flex-col bg-opacity-90 items-center   py-5 rounded-lg  w-[65%]">
                  {" "}
                  <BounceLoader
                    color={color}
                    loading={loading}
                    cssOverride={{
                      borderColor: "blue",
                    }}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-100 p-7 bg-gray-600">
                <div className="w-[80%] mx-auto bg-slate-400">
                  <Table striped="columns">
                    <thead>
                      <tr className="text-center">
                        <th>No.</th>
                        <th>Event Type</th>
                        <th>Event Time</th>
                        <th>Event Date</th>
                        <th>Total Price</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingdata
                        .filter((item) => item.status === "Success")
                        .map((filterData, id) => {
                          length=length+1
                          return (
                            <>
                              <tr className="text-center">
                                <td>{id + 1}</td>
                                <td>{filterData.type}</td>
                                <td>{filterData.time}</td>
                                <td>{filterData.event_date}</td>
                                <td>{filterData.totalPrice}</td>
                                <td>
                                  <Link
                                    to={`/booking-detail/${filterData._id}`}
                                  >
                                    <button className="bg-emerald-500 hover:bg-emerald-700 py-2 px-5 rounded font-bold">
                                      View
                                    </button>
                                  </Link>{" "}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
                <div className="flex w-full justify-center">Total {length} Orders</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
