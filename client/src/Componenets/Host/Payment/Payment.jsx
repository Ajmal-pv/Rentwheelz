import React, { useEffect, useState } from 'react'
import { orderFind } from '../../../services/host-service'

function Payment() {
    const hostId = localStorage.getItem('hostId')
    const [bookings,setBookings] = useState([])
    useEffect(()=>{
        orderFind(hostId).then((res)=>{
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
    <div className="flex-1 p-6">
    {/* Content for each section goes here */}
    <h1 className="text-2xl font-semibold mb-4">Payments</h1>

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
                    SI NO
                  </span>
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                    User
                  </span>
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                    CAR REG
                  </span>
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                   DATES
                  </span>
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                   Booking status
                  </span>
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                    TOTAL AMOUNT
                  </span>
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                    DEPOSIT
                  </span>
                </th>

                
                
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  <span className="text-lg font-semibold text-gray-800">
                    Recieved
                  </span>
                </th>
                
                

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
                    <td colSpan="8" className="py-2 px-4 border-b border-gray-300 text-center text-red-600">
                     No payment history
                    </td>
                  </tr>
                </tbody>
              )}

          </table>
        </div>
      </main>
    </div>
  </div>
  )
}

export default Payment