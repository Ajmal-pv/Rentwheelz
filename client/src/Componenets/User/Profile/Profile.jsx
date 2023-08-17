import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { userAxiosInstance  as api } from "../../../axios/Axios";


function Profile() {
    const userId = useSelector((state) => state.user.userId)
    const [user,setUser] = useState({})
  
  useEffect(() => {
    
  if(userId){
    api.post('verifyToken')
      .then((response) => {
        console.log(response);
         if(response.data.status){
       
           setUser(response.data.user)

        }
   
        
      })
      .catch((error) => {
       
        console.log(error.message);
      });

  }
  }, [userId])
  
  return (
    <div>
      <div className="flex min-h-screen ">
        {/* Sidebar */}

        <div className="w-[40%] p-4 border bg-slate-200">
          <div className="mb-4 h-[40%] bg-slate-400">
            <img
              src={"/default-profile.jpg"}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="text-center">{user.name}</p>
          </div>
          <div className=" h-[40%] border-2 rounded-lg flex p-4 flex-col ">
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Mobile:</strong> {user.mobile}
            </p>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className=" w-full flex flex-col items-center  p-10 border ">
          <h2 className="text-xl font-semibold  mb-4">Edit Profile</h2>
          
            <form className="flex flex-col items-center justify-center w-full ">
              <div className=" w-[100%] h-[95%] flex flex-col justify-center items-center">
                <div className=" mb-4 w-[50%]">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user.name}
                    className="mt-1  p-2 border rounded w-[100%]"
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user.email}
                    className="mt-1 p-2 border rounded  w-[100%]"
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label htmlFor="mobile" className="block text-sm font-medium">
                    Mobile:
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    defaultValue={user.mobile}
                    className="mt-1 p-2 border rounded  w-[100%]"
                  />
                </div>

                <div className="mb-4 w-[50%]">
                  <label
                    htmlFor="licenseFront"
                    className="block text-sm font-medium"
                  >
                    Upload License Front:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="licenseFront"
                    name="licenseFront"
                    className="mt-1 p-2 border rounded w-[100%]"
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label
                    htmlFor="licenseBack"
                    className="block text-sm font-medium"
                  >
                    Upload License Back:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="licenseBack"
                    name="licenseBack"
                    className="mt-1 p-2 border rounded w-[100%]"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
         
        </div>
      </div>
    </div>
   
  );
}

export default Profile;
