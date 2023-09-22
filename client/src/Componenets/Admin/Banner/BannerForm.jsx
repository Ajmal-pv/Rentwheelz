import React from 'react'
import {CloseOutlined} from '@ant-design/icons'
import toast, { Toaster } from "react-hot-toast";

function BannerForm({ isOpen, onClose }) {

 const handleSubmit=()=>{

 }
  return (
    
    <div className="bg-gray-100 flex items-center justify-center">
    <div className="w-full h-1/6 max-w-xl bg-white rounded border-gray-300 shadow-md">
      <div className="flex justify-end p-2">
        <CloseOutlined
          onClick={onClose}
          style={{ fontWeight: "bold", fontSize: "22px" }}
          className="hover:text-blue-500"
        />
      </div>
      <div className="pb-6 pl-6 pr-6 form h-[40rem] overflow-y-scroll">
        <h2 className="text-2xl font-semibold mb-4">Add New Banner</h2>
        <form onSubmit={handleSubmit}>
          
            {/* Car Details */}
          
              <div className="mb-4">
                <label htmlFor="licenseNumber" className="block text-sm font-medium">
                  Festive Name
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="festiveName"
                  
                  required
                  className="mt-1 p-2 border rounded w-full"
                />
                
              </div>
           
  
            <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-medium">
                Upload Banner Images:
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
              
                className="mt-1 p-2 border rounded w-full"
                required
              />
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
      <Toaster />
    </div>
  </div>
  
  )
}

export default BannerForm
