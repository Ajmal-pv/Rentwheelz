import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {CloseOutlined} from '@ant-design/icons'
import { showLoading,hideLoading } from "../../../store/alertSlice";

import { addCar } from "../../../services/host-service";
import { app, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { hostLogin } from "../../../store/hostSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CarLocation from "../../User/Car/CarLocation";
import { Document, Page, pdfjs } from 'react-pdf'; 



function NewCarForm({ isOpen, onClose }) {


   const dispatch=useDispatch()
  const [query, setQuery] = useState('');

  
  const handleLocationChange = (newLocation) => {
    setQuery(newLocation);
  };


    const host = localStorage.getItem('hostId')
    const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [documentType,setDocumentType]=useState('')

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   console.log("Selected Images:", files); // Debugging log
  //   setSelectedImages(files);
  // };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
  
    // Define the allowed image types
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'image/tiff',
      'image/svg+xml',
      // Add more image types here as needed
    ];
  
    // Filter out files that are not valid image types
    const areAllValid = files.every((file) => allowedTypes.includes(file.type));
  
  
    if (!areAllValid) {
     
      // Display an error message or take appropriate action for invalid files
      console.error('Some selected files are not valid image types.');
      setSelectedImages([])
    return toast.error('Some selected files are not valid image types.')
    

    }
    else{
 
     setSelectedImages(files)
  }
  };
  
  // const handleDocumentChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   console.log("Selected Doc:", files); // Debugging log
  //   setSelectedDocuments(files);
  // };
  const handleDocumentChange = (e)=>{
    setDocumentType('')
    const files= Array.from(e.target.files);
     // Define the allowed image types
     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  
     // Filter out files that are not valid image types
     const areAllValid = files.every((file) => allowedTypes.includes(file.type));
   

   
   
     if (!areAllValid) {
         // Display an error message or take appropriate action for invalid files
    console.error('Some selected files are not valid image or PDF types.');
    setSelectedDocuments([]);
    return toast.error('Some selected files are not valid image or PDF types.');
     
 
     }
     else{
      
      const arepdf = files.every((file) => {
       return file.type === 'application/pdf';
     })
     if(arepdf){
      setDocumentType('pdf')
     }

      setSelectedDocuments(files)
   }
  }
  
  const location = useLocation();
  const downloadUrls = [];
  const downloadDocumentUrls=[];
  const queryParams = new URLSearchParams(location.search);


  

  const initialValues = {
   
    carModel: "",
    discription:'',
    fuelType: "petrol",
    kmDriven: "",
    carBrand: "",
    carVariant: "",
    yearOfManufacture: "",
    transmissionType: "manual",
    monthsOfRenting: "",
    carColor:'',
    RegistrationNumber:''
  };

  const onSubmit = async (values) => {

    const imageFiles = selectedImages;
    const documentFiles=selectedDocuments
    if (!imageFiles || imageFiles.length === 0 || !documentFiles || documentFiles.length === 0) {
      // Handle the error and show an error popup
      console.error("No files selected.");
      // Show an error popup (e.g., using a library like toast)
      toast.error("images selected are wrong type,select images only");
      return; // Exit the function
  }
     dispatch(showLoading())

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
        
        return  addCar(values,query, downloadUrls, host,downloadDocumentUrls,documentType)})
            .then((res) => {
                
              if (res.data.status) {
                
                onClose()
                dispatch(hideLoading())
                navigate('/host/cars')
              }else{
                dispatch(hideLoading())
                toast.error('car add failure')
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        
    };

  
  const validationSchema = Yup.object({
    RegistrationNumber:Yup.string().required("Required"),
    carColor: Yup.string().required("Required"),
    discription: Yup.string().required("Required"),
    carModel: Yup.string().required("Required"),
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
   
      <div className="bg-gray-100   flex items-center justify-center">
       
        <div className="w-full h-2/6 max-w-xl  bg-white rounded  border-gray-300 shadow-md "> 
        <div className="flex justify-end p-2 "><CloseOutlined onClick={onClose} style={{ fontWeight: "bold", fontSize: "22px" }}  className="hover:text-blue-500" /></div>
       <div className="pb-6 pl-6 pr-6 form h-[40rem] overflow-y-scroll">
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
                    Registration Number:
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="RegistrationNumber"
                    defaultValue={formik.values.RegistrationNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.RegistrationNumber &&
                    formik.touched.RegistrationNumber && (
                      <div className="error">{formik.errors.RegistrationNumber}</div>
                    )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="licenseNumber"
                    className="block text-sm font-medium"
                  >
                    Discription:
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="discription"
                    defaultValue={formik.values.discription}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.discription &&
                    formik.touched.discription && (
                      <div className="error">{formik.errors.discription}</div>
                    )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="carModel"
                    className="block text-sm font-medium"
                  >
                    Car color:
                  </label>
                  <input
                    type="text"
                    id="carModel"
                    name="carColor"
                    defaultValue={formik.values.carColor}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                  {formik.errors.carColor && formik.touched.carColor && (
                    <div className="error">{formik.errors.carColor}</div>
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

                {/* <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium">
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    ref={autoCompleteRef}
                  
                    onChange={(event)=>{
                      setQuery(event.target.value)
                    }}
                    value={query}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                 
                </div> */}

               <div className="mb-4">
               <label
                    htmlFor="fuelType"
                    className="block text-sm font-medium"
                  >
                   City
                  </label>
                <CarLocation onLocationChange={handleLocationChange}/>

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
                    <option >Select</option>
                    <option defaultValue="petrol">Petrol</option>
                    <option defaultValue="diesel">Diesel</option>
                    <option defaultValue="electric">Electric</option>
                    <option defaultValue="hybrid">Hybrid</option>
                  </select>
                  {formik.errors.fuelType && formik.touched.fuelType && (
                    <div className="error">{formik.errors.fuelType}</div>
                  )}
                </div>

               
              </div>

              <div>
              <div className="mb-4">
                  <label
                    htmlFor="fuelType"
                    className="block text-sm font-medium"
                  >
                    Car Brand:
                  </label>
                  <select
                    defaultValue={formik.values.carBrand}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="carBrand"
                    name="carBrand"
                    required
                    className="mt-1 p-2 border rounded w-full"
                  >
                     <option >Select</option>
                    <option defaultValue="Maruti">Maruti</option>
                    <option defaultValue="BMW">BMW</option>
                    <option defaultValue="BENZ">Mercedes-Benz</option>
                    <option defaultValue="HYUNDAI">HYUNDAI</option>
                    <option defaultValue="Toyota">Toyota</option>
                    <option defaultValue="MG">MG</option>
                    <option defaultValue="Kia">KIA</option>
                    <option defaultValue="CITREON">Citreon</option>

                  </select>
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
                    <option >Select</option>
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
            </div>
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
                required
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
                required
              />
            </div>
            {/* <div className="mb-4">
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
            </div> */}
               <div className="mb-4">
          <label className="block text-sm font-medium">File Previews:</label>
          <div className="flex flex-wrap space-x-2">
            {selectedDocuments.map((file, index) => (
              <div key={index} className="relative">
                {documentType === 'pdf' ? (
                  <>
                  </>
                ) : (
                  <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-24 h-24 object-cover border rounded" />
                )}
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
        <Toaster/>
        </div>
      </div>
     
     
  );
}

export default NewCarForm;
