import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hostLogin } from "../../../store/hostSlice";
import { addCar } from "../../../services/host-service";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from "../../firebase/config";

function CarForm() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected Images:", files); // Debugging log
    setSelectedImages(files);
  };
  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected Doc:", files); // Debugging log
    setSelectedDocuments(files);
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const downloadUrls = [];
  const downloadDocumentUrls=[];
  const queryParams = new URLSearchParams(location.search);

  const host = queryParams.get("id");

  const initialValues = {
    licenseNumber: "",
    carModel: "",
    city: "",
    fuelType: "petrol",
    kmDriven: "",
    carBrand: "",
    carVariant: "",
    yearOfManufacture: "",
    transmissionType: "manual",
    monthsOfRenting: "",
  };

  const onSubmit = async (values) => {
    console.log("Selected Images:", selectedImages);
    const imageFiles = selectedImages;
    const documentFiles=selectedDocuments

    // const uploadPromises = imageFiles.map((imageFile) => {
    //   const storageRef = ref(storage, "images/" + imageFile.name);
    
    //   return uploadBytes(storageRef, imageFile)
    //     .then((snapshot) => getDownloadURL(storageRef))
    //     .then((url) => {
    //       downloadUrls.push(url);
    //     });
    // });
    const uploadImagePromises = imageFiles.map((imageFile) => {
      const storageRef = ref(storage, "images/" + imageFile.name);
    
      return uploadBytes(storageRef, imageFile)
        .then((snapshot) => getDownloadURL(storageRef))
        .then((url) => {
          downloadUrls.push(url);
        });
    });
    
    const uploadDocumentPromises = documentFiles.map((documentFile) => {
      const storageRef = ref(storage, "documents/" + documentFile.name);
    
      return uploadBytes(storageRef, documentFile)
        .then((snapshot) => getDownloadURL(storageRef))
        .then((url) => {
          downloadDocumentUrls.push(url);
        });
    });
    
    const uploadPromises = [...uploadImagePromises, ...uploadDocumentPromises];

   Promise.all(uploadPromises)
  .then(() => {
        
        return  addCar(values, downloadUrls, host)})
            .then((res) => {
              if (res.data.status) {
                if (queryParams.get("login")) {
                  dispatch(hostLogin());
                  navigate("/host");
                } else {
                  navigate("/host/login");
                }
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        
    };

  
  const validationSchema = Yup.object({
    licenseNumber: Yup.string().required("Required"),
    carModel: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    fuelType: Yup.string().required("Required"),
    kmDriven: Yup.string().required("Required"),
    carBrand: Yup.string().required("Required"),
    carVariant: Yup.string().required("Required"),
    yearOfManufacture: Yup.string().required("Required"),
    transmissionType: Yup.string().required("Required"),
    monthsOfRenting: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Car and Rental Details
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Car Details */}
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="licenseNumber"
                    className="block text-sm font-medium"
                  >
                    License Number:
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    defaultValue={formik.values.licenseNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.licenseNumber &&
                    formik.touched.licenseNumber && (
                      <div className="error">{formik.errors.licenseNumber}</div>
                    )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="carModel"
                    className="block text-sm font-medium"
                  >
                    Car Model:
                  </label>
                  <input
                    type="text"
                    id="carModel"
                    name="carModel"
                    defaultValue={formik.values.carModel}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.carModel && formik.touched.carModel && (
                    <div className="error">{formik.errors.carModel}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium">
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    defaultValue={formik.values.city}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.city && formik.touched.city && (
                    <div className="error">{formik.errors.city}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="fuelType"
                    className="block text-sm font-medium"
                  >
                    Fuel Type:
                  </label>
                  <select
                    defaultValue={formik.values.fuelType}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="fuelType"
                    name="fuelType"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  >
                    <option defaultValue="petrol">Petrol</option>
                    <option defaultValue="diesel">Diesel</option>
                    <option defaultValue="electric">Electric</option>
                    <option defaultValue="hybrid">Hybrid</option>
                  </select>
                  {formik.errors.fuelType && formik.touched.fuelType && (
                    <div className="error">{formik.errors.fuelType}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="kmDriven"
                    className="block text-sm font-medium"
                  >
                    Kilometers Driven:
                  </label>
                  <input
                    defaultValue={formik.values.kmDriven}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    id="kmDriven"
                    name="kmDriven"
                    min="0"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.kmDriven && formik.touched.kmDriven && (
                    <div className="error">{formik.errors.kmDriven}</div>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label
                    htmlFor="carBrand"
                    className="block text-sm font-medium"
                  >
                    Car Brand:
                  </label>
                  <input
                    defaultValue={formik.values.carBrand}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    id="carBrand"
                    name="carBrand"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.carBrand && formik.touched.carBrand && (
                    <div className="error">{formik.errors.carBrand}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="carVariant"
                    className="block text-sm font-medium"
                  >
                    Car Variant:
                  </label>
                  <input
                    defaultValue={formik.values.carVarient}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    id="carVariant"
                    name="carVariant"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.carVarient && formik.touched.carVarient && (
                    <div className="error">{formik.errors.carVarient}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="yearOfManufacture"
                    className="block text-sm font-medium"
                  >
                    Year of Manufacture:
                  </label>
                  <input
                    defaultValue={formik.values.yearOfManufacture}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    id="yearOfManufacture"
                    name="yearOfManufacture"
                    min="1900"
                    max="2099"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.yearOfManufacture &&
                    formik.touched.yearOfManufacture && (
                      <div className="error">
                        {formik.errors.yearOfManufacture}
                      </div>
                    )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="transmissionType"
                    className="block text-sm font-medium"
                  >
                    Transmission Type:
                  </label>
                  <select
                    defaultValue={formik.values.transmissionType}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="transmissionType"
                    name="transmissionType"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  >
                    <option defaultValue="manual">Manual</option>
                    <option defaultChecked="automatic">Automatic</option>
                  </select>
                  {formik.errors.transmissionType &&
                    formik.touched.transmissionType && (
                      <div className="error">
                        {formik.errors.transmissionType}
                      </div>
                    )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="monthsOfRenting"
                    className="block text-sm font-medium"
                  >
                    monthsOfRenting
                  </label>
                  <input
                    defaultValue={formik.values.KilometersDriven}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    id="monthsOfRenting"
                    name="monthsOfRenting"
                    min="1"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.monthsOfRenting &&
                    formik.touched.monthsOfRenting && (
                      <div className="error">
                        {formik.errors.monthsOfRenting}
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-medium">
                Upload Images:
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Image Previews:
              </label>
              <div className="flex space-x-2">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover border rounded"
                    />
                  </div>
                ))}
              </div>
            </div> */}
             <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-medium">
                Upload car Images:
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>


            <div className="mb-4">
              <label className="block text-sm font-medium">
                Image Previews:
              </label>
              <div className="flex space-x-2">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-medium">
                Upload Registration certificate:
              </label>
              <input
                type="file"
                id="documents"
                name="documents"
                multiple
                onChange={handleDocumentChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                RC Previews:
              </label>
              <div className="flex space-x-2">
                {selectedDocuments.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default CarForm;
