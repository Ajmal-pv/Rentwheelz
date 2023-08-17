import { adminAxiosInstance as api } from "../axios/Axios";

export const login =(values)=>{
  return  api.post('/login',{values}, { withCredentials: true })
}
