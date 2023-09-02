// api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:5000/';
const userBaseURL = baseURL

const adminBaseURL = `${baseURL}admin`;
const hostBaseURL = `${baseURL}host`;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 20000,
    timeoutErrorMessage: 'Request Timeout... Please try again!..',
  });
  return instance;
};

const attachToken = (req, tokenName) => {
  let authToken =localStorage.getItem(tokenName);
  if (authToken) {

    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
};

// User Axios Instance
export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'userToken');
  return modifiedReq;
})



// Admin Axios Instance
export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'AdminToken');
  return modifiedReq;
})

//Host Axios Instance

export const hostAxiosInstance=createAxiosInstance(hostBaseURL);
hostAxiosInstance.interceptors.request.use(async(req)=>{
  const modifiedReq=attachToken(req,'hostToken');
  return modifiedReq
})
