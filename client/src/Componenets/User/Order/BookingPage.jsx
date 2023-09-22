import React, { useState } from "react";
import { useEffect } from "react";
import { getUserBooking } from "../../../services/user-Service";

function BookingPage() {
  const [filter, setFilter] = useState("all");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserBooking(userId).then((res) => {
        if (res.status) {
          setBookings(res.data);
        }
      }).catch((error)=>{
        if (error.response && error.response.status === 500) {
         
          // Handle the 500 internal server error by redirecting to the error page
          navigate('/serverError');
        } else {
          // Handle other errors here
          console.error("Error uploading images:", error);
        
          throw error; // Propagate the error
        }
      })
    }
  }, []);

  // Filter bookings based on the selected filter
  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  return (
    <div className="bg-gray-100 min-h-screen  p-4">
      <div className="w-full mx-auto bg-gray-100 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">My Booked Cars</h1>

        {/* Filter buttons */}
        <div className="space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${
              filter === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${
              filter === "ongoing" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${
              filter === "cancelled" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Booking list */}
        <div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    RC number
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Image
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Host
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    startDate
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    endDate
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    status
                  </th>
                  {/* ... Add more headers as needed */}
                </tr>
              </thead>
              {filteredBookings?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-2 px-4 text-center">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                <tbody>
                  {filteredBookings?.map((booking) => (
                    <tr key={booking._id}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <p>{booking.car.RegistrationNumber}</p>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <img
                          src={booking.car.images[0]} // Use the URL from your booking data
                          alt="Car" // Add an appropriate alt text
                          className="w-20 h-20 rounded-lg"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.host.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.startDate}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.endDate}
                      </td>
                      <td
                        className={`py-2 px-4 border-b border-gray-300 ${
                          booking.status === "upcoming"
                            ? "text-green-600"
                            : booking.status === "ongoing"
                            ? "text-red-600"
                            : booking.status === "completed"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {booking.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
