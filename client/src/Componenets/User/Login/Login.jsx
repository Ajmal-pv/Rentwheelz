import React from "react";
import "./Login.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/userSlice";

import { userAxiosInstance as api } from "../../../axios/Axios";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string().required("Required!"),
  });
  const onSubmit = (values) => {
    const { email, password } = values;
    api.post("/signin", { email, password }, { withCredentials: true })
         .then((res) => {
        const result = res.data.userLOGIN;
        if (result.status) {
         const id1=result.id
          localStorage.setItem('userData',JSON.stringify({
            name: result.name,
            id: result.id,
            email: result.email,
            mobile: result.mobile,
          }));

          dispatch(userLogin({userId:id1}));

          navigate("/");
        } else {
          toast.error(result.message);
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
  return (
    <div>
      <section className="bg-blue gray-50">
        <div className="flex justify-center items-center h-screen w-full lg:w-4/12 px-4 mx-auto pt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign in with
                </h6>
              </div>
             
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
             
              <form onSubmit={formik.handleSubmit}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    onChange={formik.handleChange}
                    defaultValue={formik.values.email}
                    onBlur={formik.handleBlur}
                    type="email"
                    name="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 pl-2">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    onChange={formik.handleChange}
                    defaultValue={formik.values.password}
                    onBlur={formik.handleBlur}
                    type="password"
                    name="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 pl-2">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        {" "}
                        <Link to={'/forgot-password'} style={{ color: "blue" }  } >
                          Forgot Password
                        </Link>
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        {" "}
                        Don't have an account?{" "}
                        <a
                          style={{ color: "blue" }}
                          onClick={() => {
                            navigate("/signup");
                          }}
                          href=""
                        >
                          {" "}
                          Signup
                        </a>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-blue-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Sign In
                  </button>
                </div>
                <Toaster />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
