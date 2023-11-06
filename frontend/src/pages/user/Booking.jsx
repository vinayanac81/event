import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import { Url } from "../../config/BaseUrl";
const Booking = () => {
  const [bookingdata, setbookingdata] = useState([]);
  const [data, setdata] = useState([]);
  const fetchBooking = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${Url}/booking`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setbookingdata(data.booking.form);
  };
  useEffect(() => {
    fetchBooking();
  }, []);
  return (
    <div className="w-100 p-7 bg-gray-600">
      <div className="w-[80%] mx-auto bg-slate-400">
        <Table striped="columns">
          <thead>
            <tr className="text-center">
              <th>No.</th>
              <th>Event Type</th>
              <th>Event Time</th>
              <th>Event Date</th>
              <th>Count of People</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {bookingdata
              .filter((item) => item.status === "Success")
              .map((filterData, id) => {
                return (
                  <>
                    <tr className="text-center">
                      <td>{id + 1}</td>
                      <td>{filterData.type}</td>
                      <td>{filterData.time}</td>
                      <td>{filterData.event_date}</td>
                      <td>{filterData.count}</td>
                      <td>
                        <Link to={`/booking-details/${filterData._id}`}>
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
    </div>
  );
};

export default Booking;
