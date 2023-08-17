import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { forgotPasswordOtp } from "../../../services/user-Service";

const ForgotOTPForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{4}$/, "OTP must be a 4-digit number"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const queryParams = new URLSearchParams(location.search);
    const user = queryParams.get("idu");

    forgotPasswordOtp(values, user)
      .then((res) => {
        if (res.data.status) {
          const user1 = res.data.user;
          navigate(`/password-change?id=${user1}`);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      });
    // Handle form submission here

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-4">Enter OTP</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium mb-1">
                  OTP
                </label>
                <Field
                  type="text"
                  id="otp"
                  name="otp"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter the 4-digit OTP"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotOTPForm;
