import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { hostAxiosInstance as api } from "../../../axios/Axios";
import { hostLogin, hostLogout } from "../../../store/hostSlice";

function PrivateRoute() {
  const dispatch = useDispatch();
 
  const [host, setHost] = useState(false);
  const token = localStorage.getItem("hostToken");

  useEffect(() => {
    if (token) {
      api
        .post("verifyToken")
        .then((response) => {
          if (response.data.status) {
            dispatch(hostLogin({ hostId: response.data.hostid }));
            setHost(true);
          } else {
            localStorage.removeItem("hostToken");
            dispatch(hostLogout());
          }
        })
        .catch((error) => {
          console.log(error.message);
          localStorage.removeItem("hostToken");
          dispatch(hostLogout());
        });
    } else {
      dispatch(hostLogout());
    }
  }, []);

  if (token && host) {
    return (
      <>
        <Outlet />
      </>
    );
  } else if (token && !host) {
    return null;
  } else {
    return (
      <>
        <Navigate to={"/host/login"} />
      </>
    );
  }
}

export default PrivateRoute;
