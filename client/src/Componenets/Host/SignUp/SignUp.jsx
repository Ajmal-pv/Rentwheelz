import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { hostAxiosInstance as api } from "../../../axios/Axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { hostVerify, signUp } from "../../../services/host-service";

function SignUp() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [typeOtp, setTypeOtp] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email Format").required("Required!"),
    mobile: Yup.string()
      .required("Required!")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    password: Yup.string()
      .required("Required!")
      .min(6, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .required("Required!"),
  });
  const handleChangeOTP = (event) => {
    setTypeOtp(event.target.value);
  };

  const onSubmit = (values) => {
   
    if (typeOtp === null) return toast.error("no otp");
    const { name, email, password, mobile } = values;

    hostVerify(typeOtp, name, email, password, mobile)
      .then((res) => {
        if (res.data.ready) {
          const host = res.data.host._id;
          navigate(`/host/carform?id=${host}`);
        } else if (res.data.message) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const handleNextStep = () => {
    const { email, mobile, name, password } = formik.values;
    signUp(email, mobile)
      .then((res) => {
        if (res.data.status) {
          setStep(1);
        }
       
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.response.data.message);
      });
  };

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");

    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      formik.setValues({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        password: "",
        confirmPassword: "",
      });
    }
  }, []);

  return (
    <div>
      {step === 0 && (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Host Signup</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={formik.values.name}
                  onBlur={formik.handleBlur}
                  name="name"
                  onChange={formik.handleChange}
                  className="mt-1 p-2 border rounded w-full"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error">{formik.errors.name}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  onBlur={formik.handleBlur}
                  defaultValue={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  className="mt-1 p-2 border rounded w-full"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue={formik.values.mobile}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="mobile"
                  required
                  className="mt-1 p-2 border rounded w-full"
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="error">{formik.errors.mobile}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  defaultValue={formik.values.password}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  className="mt-1 p-2 border rounded w-full"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  defaultValue={formik.values.confirmPassword}
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="mt-1 p-2 border rounded w-full"
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  )}
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  form="signup-form"
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already an Host?
                  <Link
                    to="/host/login"
                    className="text-blue-500 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>

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

              <div className="flex">
                <button
                  type="submit"
                  className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default SignUp;
