import { hostAxiosInstance as api } from "../axios/Axios";

 
 
export const signUp=(email,mobile)=>{
     return api.post('/signup',{email,mobile},{withCredentials:true})
}
export const hostVerify=(typeOtp,name,email,password,mobile)=>{
    return api.post('/verifyHost',{otp:typeOtp,name,email,password,mobile },{withCredentials:true})
}

 export const addCar=(values,query,downloadedUrls,host,downloadDocumentUrls,documentType)=>{
    
    return api.post('/Addcar',{values,query,downloadedUrls,host,downloadDocumentUrls,documentType},{withCredentials:true})
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
  
  export const getHostCars=(hostId)=>{
    return api.get(`/Bookedcars?id=${hostId}`)
  }
  export const orderFind =(hostId)=>{
    return api.get(`/orderedcars?id=${hostId}`)
  }
  export const barChart=()=>{
    return api.get('/barcharts')
  }
  export const cancelBooking=(BookingId,reason)=>{
    return api.post('/cancelbooking', {BookingId,reason }, { withCredentials: true })
  }
  export const  carRevenue =(hostId)=>{
    return api.get(`/carRevenue?id=${hostId}`)
  }
