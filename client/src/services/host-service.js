import { hostAxiosInstance as api } from "../axios/Axios";

 
 
export const signUp=(email,mobile)=>{
     return api.post('/signup',{email,mobile},{withCredentials:true})
}
export const hostVerify=(typeOtp,name,email,password,mobile,id)=>{
    return api.post('/verifyHost',{otp:typeOtp,name,email,password,mobile,id:id },{withCredentials:true})
}

 export const addCar=(values,downloadedUrls,host,downloadDocumentUrls)=>{
    
    return api.post('/Addcar',{values,downloadedUrls,host,downloadDocumentUrls},{withCredentials:true})
}
export const RentCar=(carId,startDate,endDate)=>{
    
    
    return api.post('/rentcar',{carId,startDate,endDate},{withCredentials:true})
}
export const login=(email,password)=>{
    return  api.post('/signin', { email, password }, { withCredentials: true })
}
export const hostCar =(hostId)=>{
    
    return  api.get(`/hostCar?id=${hostId}`)
  }
  export const carDetails=(carId)=>{
    return api.get(`/cardetails?id=${carId}`)
  }

