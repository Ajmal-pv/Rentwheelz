import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCar } from '../../../services/user-Service';
import { car } from '../../../services/admin-Service';
import { Toaster, toast } from 'react-hot-toast';

const RelatedCar = () => {
    const navigate=useNavigate()
    const [cars,setCars]=useState([])
const location =useLocation()
const searchParams = new URLSearchParams(location.search);
const carId = searchParams.get("id");

const [numberOfCarsToShow, setNumberOfCarsToShow] = useState(8)
const [displayedCars, setDisplayedCars] = useState([]);
const [heading,setHeading]=useState('')

    useEffect(() => {
        const page=location.pathname
        if(page==='/cars/cardetails'){
            
            getCar('carDetails',carId)
            .then((res)=>{
                const carData=res.data
                if(carData){
                    setCars(carData)
                   
                     // Set the initial number of cars to display when the data is fetched
            setDisplayedCars(carData.slice(0, numberOfCarsToShow));

                   
                    setHeading('Related Cars...')
                    
                }
            }).catch((error)=>{
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
        else if(page==='/' || '/home'){
           const carId=null
            getCar('homePage',carId).then((res)=>{
                const carData=res.data
                setHeading('Latest Cars...')
                if(carData){
                    setCars(carData)
                   
                     // Set the initial number of cars to display when the data is fetched
            setDisplayedCars(carData.slice(0, numberOfCarsToShow));
                }

            }).catch((error)=>{
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
           
    
      
    }, [])
    
      
     
    
    
    
  return (
    <div className='   mt-16 mb-24'>
      <h1 className='mt-4 ml-4 text-2xl' >{heading}</h1>

      <div className="flex flex-wrap w-full ">
      {displayedCars.map((car) => (
      <div key={car._id}  className="relative m-6 h-[60vh] flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="relative w-full   flex h-60 overflow-hidden rounded-md" >
          <img className="object-cover h-full w-full" src={car.images} alt="product image" />
          
          </div>
        <div className="mt-2 px-5 pb-5 ">
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900">{car.carBrand} {car.carModel}</h5>
          </a>
          <div className=" mb-5 flex items-center justify-between">
            <div className='flex items-center'>
              <span className="text-2xl  text-slate-900">₹ {car.rentalPrice} </span> 
              <span className='text-sm'> /D</span> 
              {/* <span className="text-sm text-slate-900 line-through"></span> */}
            </div>
            <div className="flex items-center">
              
            </div>
            <div className="mt-2 px-4 ">
            <p className="text-sm text-gray-500 mt-2">Location:{car.city} </p>
            <p className="text-sm text-gray-500 mt-2">Fuel:{car.fuelType} </p>
        <p className="text-sm text-gray-500 mt-2">Year:{car.yearOfManufacture} </p>
        <p className="text-sm text-gray-500 mt-2">km driven:{car.kmDriven} km </p>
        <p className="text-sm text-gray-500 mt-2">Color:{car.color} </p>
    
        {/* Add more details as needed */}
      </div>
          </div>
          <button  onClick={()=>{
            navigate(`/cars/cardetails?id=${car._id}`)
          }} className="flex items-center w-full justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            
            Rent the Car
          </button>
          
        </div>
      </div>
        ))}
        
      </div>
      <Toaster/>
    </div>
  );
};

export default RelatedCar;

