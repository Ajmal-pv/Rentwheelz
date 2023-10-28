import { userAxiosInstance as api } from "../axios/Axios";

export const signUp = (email, mobile, password, name) => {
  return api.post(
    "/signup",
    { email, mobile, password, name },
    { withCredentials: true }
  );
};

export const verifyUser = (typeOtp, name, email, password, mobile, id) => {
  return api.post(
    "/verifyUser",
    { otp1: typeOtp, name, email, password, mobile, id },
    { withCredentials: true }
  );
};

export const signIn = (email, password) => {
  return api.post("/signin", { email, password }, { withCredentials: true });
};

export const forgotPassword = (values) => {
  return api.post("/forgot-password", { values }, { withCredentials: true });
};

export const forgotPasswordOtp = (values, user) => {
  return api.post(
    "/otp-checking",
    { values, user },
    { withCredentials: true }
  );
};

export const newPassword = (values, user) => {
  return api.post("/password-set", { values, user }, { withCredentials: true });
};
export const cars =()=>{
  return  api.get('/cars')
}
export const Singlcar =(carId)=>{
  return api.get(`/carDetails?id=${carId}`)
}
export const getCar=(carType,carPage)=>{
  return api.get(`/specialCars?type=${carType}&car=${carPage}`)
}
export const getUser=(userId)=>{
  return api.get(`/getuser?id=${userId}`)
}
export const gethost=(hostId)=>{
  return api.get(`/gethost?id=${hostId}`)
}

export const getUsers=(userId)=>{
  return api.get(`/getusers?id=${userId}`)
}
export const getwallet=(userId)=>{
  return api.get(`/getwallet?id=${userId}`)
}


export const orderCreation=(orderData)=>{
  
  return api.post('/ordercreation', {orderData} , { withCredentials: true });
}

export const callStripe = (price,product,carId) => {
 
  return api.post("/create-checkout-session", { price,product,carId }, { withCredentials: true });
};
export const datesSelected=(carId)=>{
  return api.get(`/datesSelected?id=${carId}`)
}
export const profileUpdate  = (licenseUrl,profileUrl,editedMobile,editedName,userId) => {
 
  return api.post("/edit-profile", { licenseUrl,profileUrl,editedMobile,editedName,userId}, { withCredentials: true });
};
export const getUserBooking=(userId)=>{
  return api.get(`/userBooking?id=${userId}`)
}

export const userChats=(userId)=>{
  return api.get(`/chat/${userId}`)
}
export const getMessages=(id)=>{
  return api.get(`/message/${id}`)
}

export const addMessage=(data)=>{
  return api.post(`/message/`,data,{ withCredentials: true })
}
export const cancelBooking=(BookingId,reason,userId)=>{
  return api.post('/cancelbooking', {BookingId,reason,userId }, { withCredentials: true })
}
export const cancelBookingOngoing=(BookingId,reason,userId)=>{
  return api.post('/cancelbookingOngoing', {BookingId,reason,userId }, { withCredentials: true })
}

export const  getWallet=(userId)=>{
  return api.get(`/getwallet?id=${userId}`)
}
export const hostMessage=(bookingId)=>{
  return api.get(`/sendmessage?id=${bookingId}`)
}

 
