import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { hostAxiosInstance as api } from "../../../axios/Axios";
import { useDispatch } from "react-redux";
import { hostLogin } from "../../../store/hostSlice";
import { login } from "../../../services/host-service";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string().required("Required!"),
  });

  const onSubmit = async (values) => {
    const { email, password } = values;
  
    try {
      let res = await login(email, password);
      let data = res.data.HostLOGIN;
      const par ='login'
   
      if (data.status) {
        dispatch(hostLogin({ hostId: data.id }));
        localStorage.setItem('hostToken', data.token);
        localStorage.setItem('hostId', data.id);
        navigate("/host");
      }else{
        navigate(`/host/carform?id=${data.id}`)
      }
  
    } catch (error) {
      
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data)
      } else if (error.response && error.response.status === 500) {
        navigate('/serverError');
      }
    }
  };
  

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Host Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 border rounded w-full"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 pl-2">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 p-2 border rounded w-full"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 pl-2">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/host/become-host"
              className="text-blue-500 hover:underline"
            >
              Become Host
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
