import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { hostLogout } from '../../../store/hostSlice';
import Cookies from 'js-cookie';

function Home() {

  const [logout,setLogout] = useState(false)
  const dispatch =useDispatch()
  const navigate=useNavigate()
  
  const handleLogout=()=>{

    setLogout(true)
   
  }
  
  useEffect(() => {
    if (logout) {

    Cookies.remove("host")
    dispatch(hostLogout())
      navigate('/');
     
    }
  }, [logout]);
  return (
    <div>
      



    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="bg-gray-800 w-64 py-8 px-4 text-white">
      <h1 className="text-2xl font-semibold mb-6">Rent Wheelz</h1>
        <ul className="space-y-4">
          <li className="pt-8 pb-2">
            <Link to="#" className="block hover:text-gray-300">Dashboard</Link>
          </li>
          <li className="py-2">
            <Link to="#" className="block hover:text-gray-300">Add Car</Link>
          </li>
          <li className="py-2">
            <Link to="#" className="block hover:text-gray-300">Edit Car</Link>
          </li>
          <li className="py-2">
            <Link to="#" className="block hover:text-gray-300">Manage Bookings</Link>
          </li>
          <li className="py-2">
            <Link to="#" className="block hover:text-gray-300">Profile</Link>
          </li>
          <li className="py-2">
            <Link onClick={handleLogout} className="block hover:text-gray-300">logout</Link>
          </li>
        </ul>
      </nav>
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Content for each section goes here */}
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="bg-white p-4 shadow rounded">
          {/* Dashboard content goes here */}
        </div>
      </div>
    </div>


    </div>
  )
}

export default Home
