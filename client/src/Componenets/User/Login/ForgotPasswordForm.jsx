import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userAxiosInstance as api } from "../../../axios/Axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/user-Service";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });
  

  const handleSubmit = (values, { setSubmitting }) => {
    forgotPassword(values)
      .then((res) => {
        if (res.data.status) {
          const user_id = res.data.user;
       
          navigate(`/forgot-otp?idu=${user_id}`);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      });

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium mb-1"
                >
                  email
                </label>
                <Field
                  type="text"
                  id="mobile"
                  name="email"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPasswordForm;