import React, { useEffect, useState } from "react";
import { cancelBooking, getHostCars } from "../../../services/host-service";

import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Booking() {
  const navigate = useNavigate()
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
        })

        setBookings(formattedBookings);
      }else{
        console.log('hereee');
        toast.error('NO BOOKED CARS')
        
        setBookings([])
      }
    }).catch((error) => {
      console.log('hereee');
      if (error.response) {
        // The request was made and the server responded with an error status code
        if (error.response.status === 500) {
          // Internal Server Error occurred
          navigate('/serverError')
        } else if(error.response.status === 400) {
          // Handle other non-500 errors here, if needed
          console.log('hereee');
         
          navigate('/login')
        }
      } else {
        // The request was made but no response was received
        toast.error('Network Error. Please check your internet connection.');
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
  const handleReason = (reason)=>{
    Swal.fire({
      title:'Reason',
      text: reason,
      
      confirmButtonText: 'OK',
    });

  }
  return (
    <div className="flex-1 p-6">
      {/* Content for each section goes here */}
      <h1 className="text-2xl font-semibold mb-4">Bookings</h1>
      <Toaster/>

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
                      Payment
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
                       <td className="py-4 px-6 border-b border-gray-300">
                       <h4> {booking.paymentStatus}</h4> 

                       <h4> Total:{booking.totalAmount}</h4> 
                       <h4> recieved:{ booking.status === 'Cancelled'  ? (
                        <span> {booking.totalAmount-booking.refund.Amount} </span>
                       ): booking.status === 'Completed' ? (
                        <span>{booking.totalAmount-booking.deposit}</span>
                       ):null}    </h4>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
  {(booking.status === "completed"  ) ? (
    <span className='text-green-600'>
      Completed
    </span>
  ) : booking.status === 'upcoming' ? (
    <button className="bg-red-600  py-2 px-4 rounded" 
    onClick={() => handleCancel(booking._id)}>
      Cancel
    </button>
  ): booking.status === "Cancelled" ? (
    <button className="bg-blue-600  py-1 px-2 rounded" 
    onClick={() => handleReason(booking.cancelReason)}>
      Reason
    </button>
  ):(
    <span className=" text-green-500"> Ongoing </span>
  )}
</td>
                    </tr>
                  ))}
                </tbody>
              ): (
                <tbody>
                  <tr>
                    <td colSpan="8" className="py-2 px-4 border-b border-gray-300 text-center text-red-700">
                     No bookings
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
