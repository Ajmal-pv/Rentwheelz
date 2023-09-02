import { adminAxiosInstance as api } from "../axios/Axios";

export const login =(values)=>{
  return  api.post('/login',{values}, { withCredentials: true })
}
export const car =()=>{
  
  return  api.get('/cars')
}
export const carBlocking =(carId)=>{
  return api.get(`/carBlock?id=${carId}`)
}
export const host =()=>{
  return  api.get('/hosts')
}
export const user =()=>{
  return  api.get('/users')
}
export const userBlock =(userId,reason)=>{
  return api.post('/userBlock',{userId,reason},{withCredentials:true})
}

export const unblockUser =(userId)=>{
  return api.post('/userUnBlock',{userId},{withCredentials:true})
}
export const carDetails=(carId)=>{
  return api.get(`/cardetails?id=${carId}`)
}
export const carApproval=(carId,rentalPrice)=>{
  return api.post('/carApproval',{carId,rentalPrice},{ withCredentials: true })
}
export const carReject=(carId,rejectReason)=>{
  return api.post('/carReject',{carId,rejectReason},{ withCredentials: true })
}
