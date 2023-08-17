import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link,  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  Cookies from 'js-cookie'
import { userLogin, userLogout } from "../../../store/userSlice";

const Navbar = () => {
  const dispatch =useDispatch()
  const navigate=useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logout,setLogout] = useState(false)
 


  const user = useSelector((state) => state.user.authorized);
  const handleLogout=()=>{

    setLogout(true)
   
  }
  useEffect(() => {
    if (logout) {

    Cookies.remove("user")
    dispatch(userLogout())
    localStorage.removeItem('userData')
    navigate('/');
    setIsDropdownOpen(!isDropdownOpen) 
     
    }
  }, [logout]);
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="relative md:hidden">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              menu
            </button>
            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute mt-2 w-32 mr-1 md:w-48 bg-gray-800 border rounded-lg shadow-lg py-2">
                <Link to="/cars" className="block px-4 py-2 text-white hover:bg-gray-700">
                  Cars
                </Link>
                <Link to="/host/become-host" className="block px-4 py-2 text-white hover:bg-gray-700">
                  Become Host
                </Link>
              </div>
            )}
          </div>
          {/* Brand Name */}
          <div className="flex justify-between w-1/2">
            <div
              className="text-lg font-semibold tracking-widest"
              style={{ letterSpacing: "4px" }}
            >
              <Link to="/" className="text-white hover:text-gray-300">
                RentWheelZ
              </Link>
            </div>

            <div className="flex space-x-4">
              <div className="hidden md:flex space-x-20">
                <Link to="/cars" className="text-white hover:text-gray-300">
                  Cars
                </Link>
                <Link to="/host/become-host" className="text-white hover:text-gray-300">
                  Become Host
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
            </button>
            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="right-0 absolute mt-2 w-32 mr-1 md:w-48 bg-gray-800 border rounded-lg shadow-lg py-2">
                {user ? (
                  <>
                    <Link to="/profile"  className="block px-4 py-2 text-white hover:bg-gray-700">
                      Profile
                    </Link>
                    <Link  onClick={handleLogout} className="block px-4 py-2 text-white hover:bg-gray-700">
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Sign Up
                    </Link>
                    <Link to="/login" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Login
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
