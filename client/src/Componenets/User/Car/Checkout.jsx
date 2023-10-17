import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Singlcar, callStripe, getWallet } from '../../../services/user-Service';
import { Toaster, toast } from 'react-hot-toast';
import moment from 'moment';

function Checkout() {
  const navigate=useNavigate()
  const location = useLocation();
  const [car, setCar] = useState(null); // Initialize car as null
  const [loading, setLoading] = useState(true); // Add loading state
  const [price, setPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [viewStartDate,setViewStartDate]=useState('')
  const [viewEndDate,setViewEndDate]=useState('')
  const [wallet,setWallet]=useState(null)
 const userToken = localStorage.getItem('userToken')
  const searchParams = new URLSearchParams(location.search);
  const pickupDate = searchParams.get('pd')
  
  const dropDate = searchParams.get('dd')
  const carId = searchParams.get('id')
  const userId = searchParams.get('userid')
  const hostId = searchParams.get('hostId')
  const pickupLocation = searchParams.get('pickup')
  const dropLocation = searchParams.get('drop')
 
  
useEffect(()=>{
if(pickupDate && dropDate){
  const pickupDateNew = new Date(pickupDate);
const dropDateNew = new Date(dropDate);

  const formattedStartDate = `${pickupDateNew.toLocaleDateString()} ${pickupDateNew.toLocaleTimeString()}`;
const formattedEndDate = `${dropDateNew.toLocaleDateString()} ${dropDateNew.toLocaleTimeString()}`;

  setViewStartDate(formattedStartDate)
  setViewEndDate(formattedEndDate)
}

},[pickupDate,dropDate])

  useEffect(() => {
    if (carId) {
    
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
            setLoading(false); // Set loading to false after data is fetched
          } catch (error) {
            
            setLoading(false); // Set loading to false in case of an error
          }
        })
        .catch((error) => {
         
          setLoading(false)
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
        })
    }
  }, [carId]);
  useEffect(()=>{
      try {
       getWallet(userId).then((res)=>{
        
         const wallet1 = res.data
         setWallet(wallet1)
         
       })
      } catch (error) {
        
      }
  },[])
  useEffect(()=>{
if(pickupDate && dropDate && car){
  const startDateObj = new Date(pickupDate);
  const endDateObj = new Date(dropDate);
    const pricePerDay = car.rentalPrice;

    const numberOfDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    const total = pricePerDay * (numberOfDays);

    setPrice(total)

    const priceAsNumber = parseFloat(total); // Convert the string to a floating-point number
       setTotalPrice(priceAsNumber + 3000)
      
        

   
     }

  },[pickupDate,dropDate,car])

  const handleSubmit = () => {
    

    if (userToken) {
      if(!selectedPaymentMethod){
        return toast.error('please select a payment method')
      }
      if(selectedPaymentMethod === 'stripe'){

      callStripe(totalPrice, car.carModel,carId).then((res) => {
        if (res) {
          const orderData = {
            startDate: pickupDate, // Replace with your start date
            endDate: dropDate, // Replace with your end date
            carId: carId,
            userId: userId,
            hostId: hostId,
            dropOff:dropLocation,
            pickup:pickupLocation,
            TotalAmount:totalPrice,
            deposit:3000,
            method:'Stripe'
          };
          console.log(typeof(totalPrice),'helo');
          const orderDataJSON = JSON.stringify(orderData);
  
          // Store the JSON string in localStorage
          localStorage.setItem("orderData", orderDataJSON);
          window.location.href = res.data.url;
        }
      
      })
    }else if(selectedPaymentMethod === 'wallet'){
     
      if(wallet < totalPrice){
        return toast.error('Your wallet balance is less than total amount.Please Select other payment method')
      }

      const orderData = {
        startDate: pickupDate, // Replace with your start date
            endDate: dropDate, // Replace with your end date
            carId: carId,
            userId: userId,
            hostId: hostId,
            dropOff:dropLocation,
            pickup:pickupLocation,
            TotalAmount:totalPrice,
            deposit:3000,
            method:'Wallet'
      };
      const orderDataJSON = JSON.stringify(orderData);

      localStorage.setItem("orderData", orderDataJSON); 
      navigate('/success') 
    }
    
    }else{
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Booking Summary</p>

          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {/* Example product 1 */}
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              {/* Display car image */}
              <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={car?.images} alt="" />
              <div className="flex w-full flex-col px-4 py-4">
                {/* Display car details */}
                <span className="font-semibold">{car?.carBrand}</span>
                <span className="font-semibold">{car?.carModel}</span>
                <span className="float-right text-gray-400">{car?.carVariant}</span>
                <p >{car?.color}</p>
              </div>
            </div>

            {/* Add more car products if needed */}
          </div>

          {/* Display pickup and drop-off information */}
          <p className="mt-8 text-lg font-medium">Booking Details</p>
          <div className=" font-serif">
            <p className='mt-4'>Pickup Date: {moment
                          .utc(pickupDate)
                          .format("MMMM D, YYYY, h:mm A")}</p>
            <p className='mt-4'>Drop-off Date: {moment
                          .utc(dropDate)
                          .format("MMMM D, YYYY, h:mm A")}</p>
            <p className='mt-4'>Pickup Location: {pickupLocation}</p>
            <p className='mt-4'>Drop-off Location: {dropLocation}</p>
          </div>

        
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">Complete your bookings by providing your payment details.</p>
          <div>
            {/* Payment Methods */}
<p className="mt-8 text-lg font-medium">Payment Methods</p>
<form className="mt-5 grid gap-6">
  {/* Payment method 1 */}
  <div className="relative">
    <input
      checked={selectedPaymentMethod === 'stripe'}
      onChange={() => setSelectedPaymentMethod('stripe')}
      className="peer hidden"
      id="payment_radio_1"  // Unique id
      type="radio"
      value="stripe"
      name="payment_radio"
    />
    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="payment_radio_1">
      {/* Payment method 1 content */}
      <img className="w-14 object-contain" src="https://static.thenounproject.com/png/3267011-200.png" alt="" />
      <div className="ml-5">
        <span className="mt-2 font-semibold"> Stripe </span>
        <p className="text-slate-500 text-sm leading-6">Pay securely with Stripe</p>
      </div>
    </label>
  </div>

  {/* Payment method 2 */}
  <div className="relative">
    <input
      checked={selectedPaymentMethod === 'wallet'}
      onChange={() => setSelectedPaymentMethod('wallet')}
      className="peer hidden"
      id="payment_radio_2"  // Unique id
      type="radio"
      value="wallet"
      name="payment_radio"
    />
    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="payment_radio_2">
      {/* Payment method 2 content */}
      <img className="w-14 object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYhWcFdc5G2L2ie4TqWkIMEfP7vUQ9ccz_cxim9Ju-PQ&s" alt="" />
      <div className="ml-5">
        <span className="mt-2 font-semibold">Wallet</span>
        <p className="text-slate-500 text-sm leading-6">Pay using your Wallet account.</p>
      </div>
      
    </label>
    <span className='text-red-600' >Your wallet balance is {wallet} </span>
  </div>
</form>

          </div>

          {/* Display subtotal, shipping, and total */}
          <div className="mt-6 border-t border-b py-2">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">₹ {price}</p>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900"> Security Deposit</p>
              <p className="font-semibold text-gray-900"> ₹ 3000</p>
            </div>
          </div>

          {/* Display total */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">₹ {totalPrice}</p>
          </div>
        </div>

        {/* Place order button */}
        <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={handleSubmit}>Rent Car </button>
      </div>
<Toaster/>
    </div>
  );
}

export default Checkout;