import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../../../store/userSlice";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [host, setHost] = useState(false);
  const [user, setUser] = useState(false);
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setHost(false);
    setLogout(true);
  };

  useEffect(() => {
    if (logout) {
      localStorage.removeItem("userToken");

      localStorage.removeItem("userData");
      dispatch(userLogout());
      setUser(false);
      navigate("/");
      closeDropdown();
    }
  }, [logout]);

  const localUser = localStorage.getItem("userToken");
  useEffect(() => {
    if (localUser) {
      setUser(true);
    }

    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      const hostData = userData.host;

      if (hostData) {
        setHost(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className=" border-t-2 border-b-2 bg-border-gray-200 h-[10vh] top-0 sticky z-50  bg-zinc-50">
      <div className="container mx-auto  h-full  ">
        <div className=" h-full flex justify-between items-center py-4">
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
                <Link
                  to="/cars"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cars
                </Link>

                {host ? (
                  <Link
                    to="/host/login"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Host
                  </Link>
                ) : (
                  <Link
                    to="/host/become-host"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Become Host
                  </Link>
                )}
              </div>
            )}
          </div>
          {/* Brand Name */}
          <div className="flex justify-between w-1/2 items-center">
            <div>
              <img
                src="/logo-transparent-png.png"
                alt="Company Logo"
                onClick={() => {
                  navigate("/");
                }}
                className="w-25 h-8 scale-75 inline-block cursor-pointer "
              />
            </div>

            <div className="flex space-x-4 h-full ">
              <div className="hidden md:flex space-x-10 ">
                <Link
                  to="/cars"
                  className="text-gray-950 hover:text-blue-500 transition-colors duration-300 text-l"
                >
                  CARS
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/chat"
                      className="text-gray-900 hover:text-blue-500 transition-colors duration-300 text-l"
                    >
                      MESSAGES
                    </Link>
                  </>
                ) : null}

                {host ? (
                  <Link
                    to="/host/login"
                    className="text-gray-950 hover:text-blue-500 transition-colors duration-300 text-l"
                  >
                    HOST
                  </Link>
                ) : (
                  <Link
                    to="/host/become-host"
                    className="text-gray-950 hover:text-blue-500 transition-colors duration-300 text-l"
                  >
                    BECOME HOST
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src="/user.png" alt="" className="h-8 w-8 mr-6" />
            </button>
            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="right-0 absolute mt-2 w-32 mr-1 md:w-48 bg-white  border rounded-lg shadow-lg py-2">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 "
                    >
                      PROFILE
                    </Link>
                    <Link
                      to="/rentedcars"
                      className="block px-4 py-2 text-gray-700 "
                    >
                      MY CARS
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 "
                    >
                      LOGOUT
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="block px-4 py-2  ">
                      Sign Up
                    </Link>
                    <Link to="/login" className="block px-4 py-2  ">
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
