import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { hostLogout } from '../../../store/hostSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const location = useLocation()
    
  const [logout,setLogout] = useState(false)
  const dispatch =useDispatch()
  const navigate=useNavigate()
  
  const handleLogout=()=>{

    setLogout(true)
   
  }
  const isActiveLink = (pathnames) => {
    return pathnames.includes(location.pathname);
  }

  useEffect(() => {
    if (logout) {

   localStorage.removeItem('hostToken')
    dispatch(hostLogout())
      navigate('/');
     
    }
  }, [logout]);
  return (
    
    
    <div className='w-[15vw] fixed'>
     
    <aside className="w-full bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 mb-12 mt-6">
        <h2 className="text-2xl font-semibold">Rent Wheelz</h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
        <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/host",'/host/home']) ? "bg-slate-500" : ""}`}>
            <Link to="/host" className="block text-l">
              Home
            </Link>
          </li>
          <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/host/cars",'/host/cardetails']) ? "bg-slate-500" : ""}`}>
            <Link to="/host/cars" className="block text-l">
              Cars
            </Link>
          </li>
          <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/host/bookings"]) ? "bg-slate-500" : ""}`}>
            <Link to="/host/bookings" className="block text-l">
              Bookings
            </Link>
          </li>
          <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/host/payments"]) ? "bg-slate-500" : ""}`}>
            <Link to="/host/payments" className="block text-l">
              Payments
            </Link>
          </li>
          <li className={`p-4 hover:bg-slate-500 ${isActiveLink(["/host/messages"]) ? "bg-slate-500" : ""}`}>
            <Link to="/host/messages" className="block text-l">
              Messages
            </Link>
          </li>
          {/* Add more links as needed */}
          <li className="p-4 hover:bg-slate-500">
            <Link onClick={handleLogout} className="block text-l">
              logout
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <p className="text-sm">Logged in as Host</p>
      </div>
    </aside>
    </div>
  )
}

export default Sidebar
