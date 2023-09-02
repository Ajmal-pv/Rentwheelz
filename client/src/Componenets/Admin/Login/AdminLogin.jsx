import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminAxiosInstance as api } from "../../../axios/Axios";
import { adminLogin } from "../../../store/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../../services/admin-Service";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    login(values).then((res) => {
      const result = res.data.adminLOGIN;
      if (result.status) {
       
        localStorage.setItem("AdminToken", result.token);

        dispatch(adminLogin());

        navigate("/admin");
      } else {
        toast.error(result.message);
      }
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              email:
            </label>
            <input
              type="text"
              id="username"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="mt-1 p-2 border rounded w-full"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="mt-1 p-2 border rounded w-full"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600">{formik.errors.password}</div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLogin;
