import React, { useEffect, useState } from "react";
import { getHostCars } from "../../../services/host-service";

function Booking() {
  const [bookings, setBookings] = useState([]);

  const hostId = localStorage.getItem("hostId");
  useEffect(() => {
    getHostCars(hostId).then((res) => {
      if (res.data.status) {
        const formattedBookings = res.data.Bookings.map((booking) => {
          return {
            ...booking,
            startDate: new Date(booking.startDate).toLocaleDateString(),
            endDate: new Date(booking.endDate).toLocaleDateString(),
          };
        });

        setBookings(formattedBookings);
      }
    });
  }, []);
  return (
    <div className="flex-1 p-6">
      {/* Content for each section goes here */}
      <h1 className="text-2xl font-semibold mb-4">Bookings</h1>

      <div className="flex justify-end pb-2"></div>
      <div className="bg-white p-4 shadow rounded ">
        <main className="flex-1  overflow-x-hidden">
          {/* Other components and content */}
          <div className="overflow-x-auto ">
            <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      Registration Number
                    </span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      User
                    </span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      Pickup Date
                    </span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      Drop-off Date
                    </span>
                  </th>

                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      Status
                    </span>
                  </th>

                  {/* ... Add more headers as needed */}
                </tr>
              </thead>

              {bookings.length > 0 && (
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.car.RegistrationNumber}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.user.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.startDate}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.endDate}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Booking;
