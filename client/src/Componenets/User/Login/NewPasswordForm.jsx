import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { newPassword } from "../../../services/user-Service";

const NewPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters long") 
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const queryParams = new URLSearchParams(location.search);
    const user = queryParams.get("id");
    newPassword(values, user)
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with an error status code
          if (error.response.status === 500) {
            // Internal Server Error occurred
            navigate('/serverError')
          } else {
            // Handle other non-500 errors here, if needed
            toast.error(error.response.data.message);
          }
        } else {
          // The request was made but no response was received
          toast.error('Network Error. Please check your internet connection.');
        }
      });
    setSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-4">Set New Password</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium mb-1"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Confirm new password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Set Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};

export default NewPasswordForm;
