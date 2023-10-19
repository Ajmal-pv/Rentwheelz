import React, { useState } from "react";
import { useEffect } from "react";
import { cancelBooking, cancelBookingOngoing, getUserBooking } from "../../../services/user-Service";
import { Toaster, toast } from "react-hot-toast";
import moment from "moment";
import { Link } from "react-router-dom";
import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Swal from "sweetalert2";

function BookingPage() {
  const [filter, setFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [isReasonVisible, setIsReasonVisible] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleReason = (reason) => {
    Swal.fire({
      title: 'Cancellation Reason',
      text: reason,
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };

  const handlecancel =(bookingId,userId)=>{
    Swal.fire({
      title: "Cancel Booking ?",
      input: "text",
      icon: "warning",
      inputLabel: " Cancelation fee of 100 rps will be charged",
      inputPlaceholder: "Enter reason for cancel here...",
      showCancelButton: true,
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage(
            "Please enter a reason for Cancel the booking"
          )
        }
         else {
          
        return cancelBooking(bookingId, reason,userId)
            .then((response) => {
              if (response.data.bookingCancel) {
                return response.data.message;
              } else {
                throw new Error(response.data.message);
              }
            })
            .catch((error) => {
              Swal.showValidationMessage(`Error: ${error.message}`);
            })
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`Cancelled!, Refund is initiated `, "success");
        // You can also update your component's state or perform any other necessary actions
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire( "Blocking operation cancelled", "error");
      }
    });
  }
  const handleOngoingcancel = (bookingId,userId)=>{
    Swal.fire({
      title: "Cancel Booking ?",
      input: "text",
      icon: "warning",
      inputLabel: " Only the deposit money of 3000 will be refunded ",
      inputPlaceholder: "Enter reason for cancel here...",
      showCancelButton: true,
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage(
            "Please enter a reason for Cancel the booking"
          )
        }
         else {
          
        return cancelBookingOngoing(bookingId, reason,userId)
            .then((response) => {
              if (response.data.bookingCancel) {
                return response.data.message;
              } else {
                throw new Error(response.data.message);
              }
            })
            .catch((error) => {
              Swal.showValidationMessage(`Error: ${error.message}`);
            })
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`Cancelled!, Refund is initiated `, "success");
        // You can also update your component's state or perform any other necessary actions
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire( "Blocking operation cancelled", "error");
      }
    });

  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserBooking(userId)
        .then((res) => {
          if (res.status) {
            setBookings(res.data);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with an error status code
            if (error.response.status === 500) {
              // Internal Server Error occurred
              navigate("/serverError");
            } else {
              // Handle other non-500 errors here, if needed
              toast.error(error.response.data.message);
            }
          } else {
            // The request was made but no response was received
            toast.error(
              "Network Error. Please check your internet connection."
            );
          }
        });
    }
  }, [handlecancel]);
 

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
            onClick={() => setFilter("Cancelled")}
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
                    License Number
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Image
                  </th>
                 
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    StartDate & EndDate
                  </th>
                  
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Pickup
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Drop off
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Status
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                   <h4>Payment </h4> 
                   <h4>status</h4>
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                   <h4>Amount </h4> 
                   <h4>Details</h4>
                  </th>
                  
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Manage
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Chat
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
                      <td className="py-16 px-6 border-b border-gray-300">
                        <Link
                          to={`/cars/cardetails?id=${booking.car._id}`}
                          className="text-blue-700 "
                        >
                          {booking.car.RegistrationNumber}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <img
                          src={booking.car.images[0]} // Use the URL from your booking data
                          alt="Car" // Add an appropriate alt text
                          className="w-20 h-20 rounded-lg"
                        />
                      </td>
                     

                      <td className="py-2 px-4 border-b border-gray-300">
                       <h1> {moment
                          .utc(booking.startDate)
                          .format("MMMM D, YYYY, h:mm A")} </h1>
                          To
                          <h1>{moment
                          .utc(booking.endDate)
                          .format("MMMM D, YYYY, h:mm A")}</h1>
                      </td>
                     
                      <td className="py-4 px-6 border-b border-gray-300">
                        {booking.pickupLocation}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.dropOffLocation}
                      </td>

                      <td
                        className={`py-2 px-4 border-b border-gray-300 ${
                          booking.status === "upcoming"
                            ? "text-orange-400"
                            : booking.status === "ongoing"
                            ? "text-green-400 "
                            : booking.status === "completed"
                            ? "text-green-800"
                            : "text-red-600"
                        }`}
                      >
                        {booking.status}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                       <h4>{booking.paymentStatus}</h4> 
                       {booking.status==='Cancelled' ? (
                    <h4>  {booking.refund.method}</h4> 

                       ):
                       <h4>{booking.paymentMethod}</h4>}
                      
                       
                      </td>

                      <td className="py-2 px-4 border-b border-gray-300">
                      
                    
                      <h4>Total: <span>{booking.totalAmount}</span></h4>
                       <span>Deposit:</span> <span className="text-red-600">{booking.deposit}</span>
                       {booking.status==='Cancelled' ? (
                        <h4>Refund :  <span>{booking.refund.Amount}</span></h4>
                       ):null}
                       
                      
                      </td>

                      <td className="py-2 px-4 border-b border-gray-300">
                        { booking.status === "upcoming" ? (
                          
                          
                         <Button type="primary" danger onClick={ ()=>{handlecancel(booking._id,userId)} }>Cancel</Button>
                        ) : booking.status === 'ongoing' ? (
                          <Button type="default" danger onClick={ ()=>{handleOngoingcancel(booking._id,userId)} }>Return</Button>
                        ) : booking.status === 'completed' ? (
                         <span className="text-green-700">Completed</span>
                        ) : booking.status === 'Cancelled' ? (
                          <div>
                          <span onClick={()=>{
                            handleReason(booking?.cancelReason)
                          }}  className="text-blue-600 cursor-pointer">Reason</span>
                         
                          </div>
                        ): null
                          }
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <MessageOutlined />{" "}
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default BookingPage;
