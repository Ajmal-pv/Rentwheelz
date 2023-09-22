import React, { useEffect, useState } from 'react'
import { bookings } from '../../../services/admin-Service'


function Bookings() {
    const[bookings1,setBookings1]=useState([])
    const[allbooking,setAllBooking]=useState([])
    const[upcoming,setUpcoming]=useState([])
    const[completed,setCompleted]=useState([])
    const[ongoing,setOngoing]=useState([])
    useEffect(()=>{
    bookings().then((res)=>{
        if(res.data.bookings){
            setBookings1(res.data.BookData)
            setAllBooking(res.data.BookData)
            setUpcoming(res.data.upcoming)
            setCompleted(res.data.completed)
            setOngoing(res.data.ongoing)
           
        }

    })
    },[])
      const completedBooking=()=>{
        setBookings1(completed)
      }
      const Running=()=>{
        setBookings1(ongoing)
      }
      const upcomingBooking=()=>{
        setBookings1(upcoming)
      }
      const AllBooking=()=>{
        setBookings1(allbooking)
      }
  return (
    <main className="flex-1 p-4 overflow-x-hidden">
    {/* Your main content goes here */}
    <div className=' transition-colors'>
    <h1 className="text-2xl font-semibold  mb-4 mt-6 border-gray-800 ">CARS</h1>
    <div className='flex justify-end '>
    <button
   onClick={AllBooking}
    className="bg-black hover:bg-black  text-white  font-bold py-2 m-2 px-4 rounded"
    
  >
    All
  </button>
    <button
   onClick={upcomingBooking}
    className="bg-yellow-500 hover:bg-yellow-600  text-white  font-bold py-2 m-2 px-4 rounded"
    
  >
    Upcoming
  </button>
  <button
   onClick={Running}
    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-2 rounded"
  >
    Running
  </button>
  <button
   onClick={completedBooking}
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-2"
  >
    Completed
  </button>
 
    </div>
    </div>
   
    {/* Other components and content */}
    <div className="overflow-x-auto mt-6">
  <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b border-gray-300 text-left">RC number</th>
       
        <th className="py-2 px-4 border-b border-gray-300 text-left">user</th>
        
        
        <th className="py-2 px-4 border-b border-gray-300 text-left">startDate</th>
        <th className="py-2 px-4 border-b border-gray-300 text-left">endDate</th>
        
        <th className="py-2 px-4 border-b border-gray-300 text-left">status</th>
       


      
        {/* ... Add more headers as needed */}
      </tr>
    </thead>
    <tbody>
  {bookings1.length === 0 ? (
    <tr>
      <td colSpan="5" className="py-2 px-4 text-center">
        No bookings
      </td>
    </tr>
  ) : (
    bookings1.map((booking) => (
      <tr key={booking._id}>
        <td className="py-2 px-4 border-b border-gray-300">
          <p>{booking.car.RegistrationNumber}</p>
        </td>
        <td className="py-2 px-4 border-b border-gray-300">{booking.user.name}</td>

        <td className="py-2 px-4 border-b border-gray-300">{booking.startDate}</td>
        <td className="py-2 px-4 border-b border-gray-300">{booking.endDate}</td>
        <td
          className={`py-2 px-4 border-b border-gray-300 ${
            booking.status === 'upcoming'
              ? 'text-green-600'
              : booking.status === 'ongoing'
              ? 'text-red-600'
              : booking.status === 'completed'
              ? 'text-red-600'
              : 'text-yellow-600'
          }`}
        >
          {booking.status}
        </td>
      </tr>
    ))
  )}
</tbody>

  </table>
  
</div>
  </main>
  )
}

export default Bookings