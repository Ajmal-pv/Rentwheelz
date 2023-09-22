import React, { useEffect } from "react";




const PaymentPage = () => {
    useEffect(()=>{
    
    },[])
  return (


    <div className="flex justify-center">
      {/* Left Side: Car Details */}
      <div className="w-1/2 p-4 border rounded-lg ">
        {/* Car Image */}
        <div className="flex flex-col-reverse md:flex-row justify-center">
  {/* Right Side: Car Details */}
  <div className="w-full md:w-1/2 p-4 border rounded-lg">
    {/* Car Details */}
    <img
      src="car_image_url"
      alt="Car"
      className="w-1/3 h-64 md:h-40 object-cover rounded-lg"
    />
  </div>

  {/* Left Side: Car Image */}
  <div className="w-full md:w-1/2 p-4">
  <div className="mt-4 ">
      <h2 className="text-xl font-semibold mt-2 mb-6">Car Name/Model</h2>
      <p className="mt-4">Pickup Date: YYYY-MM-DD</p>
      <p className="mt-4">Drop-off Date: YYYY-MM-DD</p>
      <p className="mt-4">Pickup Location: Your Pickup Location</p>
    <p className="mt-4">Drop-off Location: Your Drop-off Location</p>
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
          <span className="text-green-700 font-bold text-2xl">₹ Total Amount</span>
        </div>

        {/* Payment Options */}
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Select Payment Method:</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" name="paymentMethod" value="creditCard" />
              <span className="ml-2">Credit Card</span>
            </label>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" name="paymentMethod" value="paypal" />
              <span className="ml-2">PayPal</span>
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

export default PaymentPage;
