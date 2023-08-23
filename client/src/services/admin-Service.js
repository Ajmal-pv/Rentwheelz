import { adminAxiosInstance as api } from "../axios/Axios";

export const login =(values)=>{
  return  api.post('/login',{values}, { withCredentials: true })
}
export const car =()=>{
  return  api.get('/cars')
}
export const host =()=>{
  return  api.get('/hosts')
}
