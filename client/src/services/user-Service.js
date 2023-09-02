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
