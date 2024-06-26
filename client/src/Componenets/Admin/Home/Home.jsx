import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pdf from "./Pdf";
import ApexChart2 from "./Pie";
import { orderFind } from "../../../services/admin-Service";

const AdminDashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [upcoming, setUpcoming] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [ongoing, setOngoing] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [bookings, setBookings] = useState([]);
  // useEffect(() => {
  //   orderFind().then((res) => {
  //     if (res.data.status) {
  //       const formattedBookings = res.data.Bookings.map((booking) => {
  //         return {
  //           ...booking,
  //           startDate: new Date(booking.startDate).toLocaleDateString(),
  //           endDate: new Date(booking.endDate).toLocaleDateString(),
  //         };
  //       });

  //       setBookings(formattedBookings);
  //     }
  //   });
  // }, [])

  return (
    <main className="flex-1  p-5 overflow-x-auto w-full">
      {/* Your main content goes here */}
      <div className=" transition-colors">
        <h1 className="text-2xl font-semibold  mb-4 mt-6 border-gray-800 ">
          DASHBOARD
        </h1>
        <div className="rounded p-2 ">
          <div className="container mx-auto p-4 box-border  border-gray-300 bg-white">
            <div className="flex flex-col md:flex-row md:space-x-4 justify-center items-center">
              <div className="w-2/3 flex justify-evenly items-center">
                <div className="">
                  <div className="mb-4">
                    <label
                      className="block font-bold mb-2 "
                      htmlFor="end-date"
                    >
                      Start Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start Date"
                      className="font-semibold  rounded-lg border px-3 py-2 bg-slate-300"
                    />{" "}
                    
                  </div>
                  
                </div>
                <p className="font-bold">TO</p>
                <div className="">
                  <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="end-date">
                      End Date
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="End Date"
                      className="font-semibold  rounded-lg border px-3 py-2 bg-slate-300"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex justify-center">
                <div className="">
                  <label className="block font-bold mb-2" htmlFor="location">
                    Generate PDF
                  </label>
                  <div className="mb-4">
                    <Pdf
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                      startDate={startDate}
                      endDate={endDate}
                      
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex space-x-4 w-full">
            <div className="flex-grow bg-white p-4 m-4 shadow rounded flex flex-col justify-center items-center">
              <div className="text-xl text-orange-400 font-bold">
                Upcoming Booking
              </div>
              <div className="text-3xl font-bold">{upcoming}</div>{" "}
              
            </div>
            <div className="flex-grow bg-white p-4 m-4 shadow rounded flex flex-col justify-center items-center">
              <div className="text-xl text-green-400 font-bold">
                Ongoing Booking
              </div>
              <div className="text-3xl font-bold">{ongoing}</div>{" "}
           
            </div>
            <div className="flex-grow bg-white p-4 m-4 shadow rounded flex flex-col justify-center items-center">
              <div className="text-xl font-bold text-blue-500">
                Completed Booking
              </div>
              <div className="text-3xl font-bold">{completed}</div>{" "}
              
            </div>
            <div className="flex-grow bg-white p-4 m-4 shadow rounded flex flex-col justify-center items-center">
              <div className="text-xl font-bold text-red-500">
                Cancelled Booking
              </div>
              <div className="text-3xl font-bold">{cancelled}</div>{" "}
             
            </div>
          </div>
        </div>
        <div className="flex m-2 justify-between ">
          <div className="bg-white w-1/2 shadow rounded p-4 ">
            <h2 className="text-xl font-semibold mb-4">Booking Data</h2>
            <ApexChart2
              setCancelled={setCancelled}
              setCompleted={setCompleted}
              setOngoing={setOngoing}
              setUpcoming={setUpcoming}
            />
          </div>

          <div className="bg-white p-4 h-80 shadow rounded  ">
            <main className="flex  overflow-x-hidden">
              <div className="p-4 f ">
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2"> User</th>
                        <th className="border p-2">Booked Car</th>
                        <th className="border p-2">Booking status</th>
                        <th className="border p-2">mode</th>
                        <th className="border p-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.map((booking) => (
                        <tr key={booking._id}>
                          <td className="border p-2">{booking.user.name}</td>
                          <td className="border p-2">
                            {booking.car}
                          </td>
                          <td className="border p-2">{booking.status}</td>
                          <td className="border p-2">
                            {booking.paymentMethod}
                          </td>
                          <td className="border p-2">
                            {" "}
                            {booking?.status === "completed" ? (
                              <span> {booking.totalAmount - 3000}</span>
                            ) : (
                              <span>
                                {booking?.totalAmount - booking.refund.Amount}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
