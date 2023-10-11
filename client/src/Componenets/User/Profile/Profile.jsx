import React, { useEffect, useRef, useState } from "react";
import { getUser, profileUpdate } from "../../../services/user-Service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { app, storage } from "../../firebase/config";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../store/alertSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [user, setUser] = useState([]);
  const [update, setUpdate] = useState(null);
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const userId = userData.id;
  useEffect(() => {
    getUser(userId).then((res) => {
      setUser(res.data);
    }).catch((error)=>{
      if (error.response) {
        // The request was made and the server responded with an error status code
        if (error.response.status === 500) {
          // Internal Server Error occurred
          navigate('/serverError')
        } else {
          // Handle other non-500 errors here, if needed
          toast.error(error.response.data.message);
        }
      } else {
        // The request was made but no response was received
        toast.error('Network Error. Please check your internet connection.');
      }
    });
  }, [update]);
  const profileImageInputRef = useRef(null);
  const licenseImageInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [editedName, setEditedName] = useState(null);
  const [editedMobile, setEditedMobile] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  

  const [profileUrl, setProfileUrl] = useState([]);
  const [licenseUrl, setLicenseUrl] = useState([]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setLicenseImage(null);
    setProfileImage(null);
    setEditedMobile(null);
    setEditedName(null);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    dispatch(showLoading())
  
    const uploadProfileImage = () => {
      if (profileImage) {
        
        const imageFile = profileImage
        
        const storageRef = ref(storage, "images/" + imageFile.name);
  
        return uploadBytes(storageRef, imageFile)
          .then((snapshot) => getDownloadURL(storageRef))
          .then((url) => {
           profileUrl.push(url)
          })
          .catch((error) => {
          
            if (error.response && error.response.status === 500) {
              dispatch(hideLoading())
              // Handle the 500 internal server error by redirecting to the error page
              navigate('/serverError');
            } else {
              // Handle other errors here
              console.error("Error uploading images:", error);
              dispatch(hideLoading());
              throw error; // Propagate the error
            }
          })
      } else {
        return Promise.resolve(); // No profile image to upload
      }
    };
  
    const uploadLicenseImage = () => {
      if (licenseImage) {
       
        const imageFile = licenseImage
        const storageRef = ref(storage, "images/" + imageFile.name);
        return uploadBytes(storageRef, imageFile)
          .then((snapshot) => getDownloadURL(storageRef))
          .then((url) => {
            
            licenseUrl.push(url)
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              dispatch(hideLoading())
              // Handle the 500 internal server error by redirecting to the error page
              navigate('/serverError');
            } else {
              // Handle other errors here
              console.error("Error uploading images:", error);
              dispatch(hideLoading());
              throw error; // Propagate the error
            }
            
           
          }
          
          );
      } else {
        return Promise.resolve(); // No license image to upload
      }
    };
    const uploadPromises = [uploadLicenseImage(),uploadProfileImage()]
    // Use Promise.all to wait for both uploads to complete
    Promise.all(uploadPromises)
      .then(() => {
        
      profileUpdate(licenseUrl[0],profileUrl[0],editedMobile,editedName,userId).then((res)=>{
        if(res.data.user){
         
         
          setUpdate(res)
          setIsEditing(false);
          setLicenseUrl([])
          setProfileUrl([])
          
            dispatch(hideLoading())
          
          

          
          
         
        }
        
 

      }).catch((error)=>{
        if (error.response && error.response.status === 500) {
          dispatch(hideLoading())
          // Handle the 500 internal server error by redirecting to the error page
          navigate('/serverError');
        } else {
          // Handle other errors here
          console.error("Error uploading images:", error);
          dispatch(hideLoading());
        }
      })
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          dispatch(hideLoading())
          // Handle the 500 internal server error by redirecting to the error page
          navigate('/serverError');
        } else {
          // Handle other errors here
          console.error("Error uploading images:", error);
          dispatch(hideLoading());
        }
      });
  };
  
  
 
  

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file,'file');
    setProfileImage(file)
   
  };

  const handleLicenseImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file,'file');
    setLicenseImage(file)
  };

  const openProfileImageInput = () => {
    profileImageInputRef.current.click();
  };

  const openLicenseImageInput = () => {
    licenseImageInputRef.current.click();
  };
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleMobileChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input value is exactly 10 digits
    if (/^\d{10}$/.test(inputValue)) {
      // Update the editedMobile state if the input is valid
      setEditedMobile(inputValue);
    } else {
      // Handle invalid input (e.g., show an error message)
      // You can set an error state or display a validation message here
      // For now, I'm just resetting editedMobile to an empty string
      setEditedMobile("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div>
          {/* Profile Picture */}

          <div className="mb-4">
            {isEditing ? (
              <div>
                {profileImage && (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="w-36 h-28 rounded-full mx-auto cursor-pointer"
                    onClick={openProfileImageInput}
                  />
                )}
                {!profileImage && (
                  <img
                    src={
                      user?.profileImage?.[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-36 h-28 rounded-full mx-auto cursor-pointer"
                    onClick={openProfileImageInput}
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={profileImageInputRef}
                  onChange={handleProfileImageChange}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <div>
                <img
                  src={user?.profileImage?.[0]}
                  alt="User Avatar"
                  className="w-36 h-28 rounded-full mx-auto"
                />
              </div>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={editedName || user.name}
                onChange={handleNameChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            ) : (
              <p>Name: {user.name}</p>
            )}
            {isEditing ? (
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={editedMobile || user.mobile}
                onChange={handleMobileChange}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            ) : (
              <p>Phone: {user.mobile}</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">License Image</h2>
            {isEditing ? (

              <div>
                {licenseImage &&(
                <img
                src={URL.createObjectURL(licenseImage)}
                  className="w-96 h-52 m-6 mx-auto cursor-pointer"
                  onClick={openLicenseImageInput}
                />)}
                {!licenseImage &&(
                   <img
                   src={ user?.LicenseImage?.[0]}
                   className=" w-96 h-52  m-6 mx-auto cursor-pointer"
                   onClick={openLicenseImageInput}
                 />
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={licenseImageInputRef}
                  onChange={handleLicenseImageChange}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <div>
                <img
                  src={user?.LicenseImage?.[0]}
                  alt="License"
                  className="w-96 h-52 mx-auto m-6"
                />
              </div>
            )}
          </div>
          
        </div>

        <div className="text-center mt-4">
          {isEditing ? (
            <div>
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Profile;
