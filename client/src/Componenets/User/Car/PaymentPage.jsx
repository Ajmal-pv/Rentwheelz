import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Singlcar } from "../../../services/user-Service";




const PaymentPage = () => {
  const location = useLocation();
  const [car, setCar] = useState([]);
   const searchParams = new URLSearchParams(location.search);
   const navigate = useNavigate()

   // Access individual query parameters using the get method
   const pickupDate = searchParams.get('pd');
   const dropDate = searchParams.get('dd');
   const carId = searchParams.get('id');
   const userId = searchParams.get('userid');
   const hostId = searchParams.get('hostId');
   const pickupLocation = searchParams.get('pickup');
   const dropLocation = searchParams.get('drop');
   const price = searchParams.get('price');
   useEffect(() => {
    if(carId){
    Singlcar(carId)
      .then((res) => {
        try {
          const carData = res.data;
          if (carData.rentalEndDate) {
            const rentalEndDate = new Date(carData.rentalEndDate);
            const formattedDate = rentalEndDate.toLocaleDateString();
            carData.rentalEndDate = formattedDate;
          }

          setCar(carData);
        } catch (error) {
          console.error(error);
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
      })}
  }, [carId])


 
  return (


    <div className="flex justify-center">
      {/* Left Side: Car Details */}
      <div className="w-2/3 border rounded-lg ">
        {/* Car Image */}
        <div className="flex flex-col-reverse  md:flex-row justify-center">
  {/* Right Side: Car Details */}
  <div className="w-2/6 m-2 border rounded-lg flex justify-center items-center">
        {car.images ? (
          <img
            src={car?.images[0]}
            alt="Car"
            className="w-full h-full md:h-full object-cover rounded-lg"
          />
        ) : null}
      </div>

  {/* Left Side: Car Image */}
  <div className="w-full md:w-4/6 p-4">
  <div className="mt-4 ">
      <h2 className="text-xl font-semibold mt-2 mb-6">{car?.carModel}</h2>
      <p className="mt-4">Pickup Date: {pickupDate}</p>
      <p className="mt-4">Drop-off Date:{dropDate}</p>
      <p className="mt-4">Pickup Location: {pickupLocation}</p>
    <p className="mt-4">Drop-off Location:{dropLocation} </p>
      {/* Add other car details here */}
    </div>
    {/* Car Image */}
   
  </div>
</div>
      </div>

      {/* Right Side: Payment Details */}
      <div className="w-1/2 p-4 border rounded-lg ">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>

        {/* Total Cost */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Total Cost:</label>
        <span className="text-green-700 font-bold text-2xl">₹ {price}</span>
        </div>

        {/* Payment Options */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Select Payment Method:</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" name="paymentMethod" value="wallet" />
              <span className="ml-2">Wallet</span>
            </label>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" name="paymentMethod" value="card" />
              <span className="ml-2">Card Payment</span>
            </label>
          </div>
          {/* Add more payment options as needed */}
        </div>

        {/* Pay Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
         // Implement a function to handle payment
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage
