import React, { useEffect, useState } from "react";
import { cancelBooking, getHostCars } from "../../../services/host-service";
import Swal from "sweetalert2";
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
  const handleCancel=(BookingId)=>{
    Swal.fire({
      title: "Cancel Booking",
      input: "text",
      inputLabel: "Reason for Cancelling",
      inputPlaceholder: "Enter reason here...",
      showCancelButton: true,
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage(
            "Please enter a reason for blocking the user"
          );
        } else {
          return cancelBooking(BookingId, reason)
            .then((response) => {
              if (response.data.bookingCancel) {
                return response.data.message;
              } else {
                throw new Error(response.data.message);
              }
            })
            .catch((error) => {
              Swal.showValidationMessage(`Error: ${error.message}`);
            });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Booking Cancelled!", result.value, "success");
        // You can also update your component's state or perform any other necessary actions
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "operation cancelled", "error");
      }
    });
  }
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
                      Pick-up Location
                    </span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      Drop-off Location
                    </span>
                  </th>

                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      Status
                    </span>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    <span className="text-lg font-semibold text-gray-800">
                      Cancel
                    </span>
                  </th>

                  {/* ... Add more headers as needed */}
                </tr>
              </thead>

              {bookings.length > 0 ? (
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
                        {booking.pickupLocation}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.dropOffLocation}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.status}
                      </td>
                      {/* <td className="py-2 px-4 border-b border-gray-300">
                       
                        <button className="bg-red-600  py-2 px-4 rounded" 
                        onClick={() => handleCancel(booking._id)}>
                          Cancel
                        </button>
                      </td> */}
                      <td className="py-2 px-4 border-b border-gray-300">
  {(booking.status === "completed" || booking.status === "Cancelled") ? (
    <span className={`text-${booking.status === "completed" ? "green":"red"}-600`}>
      {booking.status === "completed" ? "Completed" : "Cancelled"}
    </span>
  ) : (
    <button className="bg-red-600  py-2 px-4 rounded" 
    onClick={() => handleCancel(booking._id)}>
      Cancel
    </button>
  )}
</td>
                    </tr>
                  ))}
                </tbody>
              ): (
                <tbody>
                  <tr>
                    <td colSpan="8" className="py-2 px-4 border-b border-gray-300 text-center">
                      You have no Bookings
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Booking
