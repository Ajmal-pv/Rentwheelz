import React, { useEffect, useState } from 'react'
import { orderFind } from '../../../services/admin-Service';

function Payments() {
    const [bookings,setBookings] = useState([])
    useEffect(()=>{
        orderFind().then((res)=>{
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
        })
    },[])
  return (
    <main className="flex-1 p-4 overflow-x-hidden">
      {/* Your main content goes here */}
      <div className=" transition-colors">
        <h1 className="text-2xl font-semibold  mb-8 mt-6 border-gray-800 ">
          PAYMENTS
        </h1>
      </div>
      {/* Other components and content */}
      <div className="overflow-x-auto mt-16">
        <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                SI NO
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                USER
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                HOST
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                CAR REG
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                DATES
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
              BOOKING STATUS
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
              TOTAL AMOUNT
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
              DEPOSIT
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                    RECIEVED
                  </span>
                </th>
              

              {/*           
            {/* ... Add more headers as needed */}
            </tr>
          </thead>
           
          {bookings.length > 0 ? (
                <tbody>
                  {bookings.map((booking,index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-300">
                       {index+1}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.user.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.host.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      {booking.car.RegistrationNumber}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                    <span>{booking.startDate} to  {booking.endDate}</span>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      {booking.status}
                      
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      {booking.totalAmount}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                      3000
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {booking.status === 'completed' ?  (
                            <span> {booking.totalAmount-3000}</span>
                        ):(
                            <span>{booking.totalAmount-booking.refund.Amount}</span>
                        )}
                     
                      </td>

                    </tr>
                  ))}
                </tbody>
              ): (
                <tbody>
                  <tr>
                    <td colSpan="8" className="py-2 px-4 border-b border-gray-300 text-center">
                    No Payments
                    </td>
                  </tr>
                </tbody>
              )}
        </table>
      </div>
    </main>
  )
}

export default Payments