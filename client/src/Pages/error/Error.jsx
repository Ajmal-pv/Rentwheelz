import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Error = () => {
  const  navigate =useNavigate()
  const [error, setError] = useState(null);


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const errorStatus = searchParams.get('error');

   
    if (errorStatus === '401') {
      setError(' 401  Unauthorized: You are not logged in or your session has expired,OR You are using Manipulated Token for autherization.');
    } else if (errorStatus === '403') {
      setError(' 403  Forbidden: You do not have permission to access this resource.');
    }
  }, []);

  return (
    <div>
      
      <div className="grid h-screen px-4 bg-white place-content-center">
     {error &&  <h1 className="tracking-widest text-gray-500 uppercase">{error}</h1>}
     <div className="flex flex-col items-center">
        <button onClick={()=>{
            navigate('/login')
        }} className="mt-4 px-6 py-3 w-36 bg-blue-500 text-white rounded hover:bg-blue-600">Back to Login</button>
      </div>

    </div>
   
    </div>
  );
};

export default Error;
