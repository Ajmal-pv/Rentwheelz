import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { signUp, verifyUser } from "../../../services/user-Service";

function SignUp() {
  const [step, setStep] = useState(0);
  const [id, setId] = useState("");
  const [countdown, setCountdown] = useState(0); 
  const [typeOtp, setTypeOtp] = useState(null);
  const navigate = useNavigate();


    // Function to start the countdown
  const startCountdown = () => {
    setCountdown(60); // Set the initial countdown value to 60 seconds
  };

  // useEffect to update the countdown and handle its behavior
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, [countdown]);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };
  const handleNextStep = () => {
   
if(!formik.values.name || !formik.values.email || !formik.values.mobile || !formik.values.password){
return toast.error('Fill All the data before submission')
}
    const { name, email, password, mobile } = formik.values;
    signUp(email, mobile, password, name)
      .then((res) => {
        if (res.data.status) {
          setStep(1);
          setCountdown(60)
        }
        setId(res.data.id);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleChangeOTP = (event) => {
    setTypeOtp(event.target.value);
  };

  const onSubmit = (values) => {
    if (typeOtp === null) return alert("no otp");
    const { name, email, password, mobile } = values;
    verifyUser(typeOtp, name, email, password, mobile, id)
      .then((res) => {
        if (res.data.ready) {
          navigate("/login");
          
        } else if (res.data.message) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Required!"),
    email: Yup.string().email("Invalid email Format").required("Required!"),
    mobile: Yup.string()
      .required("Required!")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    password: Yup.string()
      .required("Required!")
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
          {step === 0 && (
            <>
              <h3 className="text-2xl font-bold text-center">JOIN US</h3>
              <form>
                <div className="mt-4">
                  <div>
                    <label className="block" htmlFor="Name">
                      Name
                    </label>
                    <input
                      defaultValue={formik.values.name}
                      onBlur={formik.handleBlur}
                      name="name"
                      onChange={formik.handleChange}
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="error">{formik.errors.name}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block" htmlFor="email">
                      Email
                    </label>
                    <input
                      onBlur={formik.handleBlur}
                      defaultValue={formik.values.email}
                      onChange={formik.handleChange}
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="error">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block" htmlFor="mobile">
                      Mobile
                    </label>
                    <input
                      defaultValue={formik.values.mobile}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      name="mobile"
                      placeholder="mobile"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="error">{formik.errors.mobile}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block">Password</label>
                    <input
                      defaultValue={formik.values.password}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div className="error">{formik.errors.password}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block">Confirm Password</label>
                    <input
                      defaultValue={formik.values.confirmPassword}
                      name="confirmPassword"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <div className="error">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>

                 
                  <div className="flex">
                    <button
                      type="button" // Use type="button" to prevent form submission
                      onClick={handleNextStep}
                      disabled={!formik.isValid}
                      className="w-full px-6 py-2 mt-4 text-white bg-gray-900 rounded-lg hover:bg-gray-950"
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                  <div className="mt-6  text-grey-dark">
                    Already have an account ?
                    <Link
                     to={'/login'}
                      className="text-blue-600 hover:underline ml-2"
                      
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </>
          )}

          {step === 1 && (
           <>
           <form onSubmit={formik.handleSubmit}>
             <div className="mt-4">
               <label className="block" htmlFor="otp">
                 Enter OTP
               </label>
               <input
                 defaultValue={typeOtp}
                 onChange={handleChangeOTP}
                 type="text"
                 name="otp"
                 placeholder="Enter OTP"
                 className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
               />
             </div>

             {/* Display the countdown timer */}
             {countdown > 0 && (
               <div className="flex flex-col">
               <button
                 type="submit"
                 className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
               >
                 Verify OTP
               </button>
               
               <p className="mt-2 text-center text-blue-600">
                 Resend OTP in {countdown} seconds
               </p>
             </div>
             
             )}

             {/* Display the "Resend OTP" button */}
             {countdown === 0 && (
               <div className="flex">
                 <button
                   type="button"
                   onClick={handleNextStep}
                   className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                 >
                   Resend OTP
                 </button>
               </div>
             )}

            
           </form>
         </>
       )}
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default SignUp
