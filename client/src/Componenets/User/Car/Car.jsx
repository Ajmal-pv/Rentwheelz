import React, { useEffect, useState } from 'react'
import { cars } from '../../../services/user-Service'
import { Link, useNavigate } from 'react-router-dom'
import CarLocation from './CarLocation'

function Car() {
  const navigate = useNavigate()
    
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [allcar,setAllcar]=useState([])
    const[cars1,setCars1]=useState(allcar)
    const [location, setLocation] = useState('');
    const [startDate,setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')

  
    const handleLocationChange = (newLocation) => {
      setLocation(newLocation);
    };
   

    useEffect(() => {
      cars().then((res)=>{
        if(res.data.status){
   setAllcar(res.data.cars)
   setCars1(res.data.cars)
        }
      })
    
      
    }, [])

   
    const [filteredCars, setFilteredCars] = useState([]);
  
    // Handle input changes for start date, end date, and location
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };
  
    
  
    // Function to filter cars based on user input
    const filterCars1 = () => {
      if(location && startDate && endDate){
      const filtered = cars1.filter((car) => {
        // Check if car meets the criteria
        const carStartDate = new Date(car.rentalStartDate);
      const carEndDate = new Date(car.rentalEndDate);

      return (
        carStartDate <= new Date(startDate) &&
        carEndDate >= new Date(endDate) &&
        car.city.toLowerCase() === location.toLowerCase()
      );
      
      });
    
      setCars1(filtered);}
    };

    
  
   
    
    
  return (

    <div className='flex flex_col h-[100vh]' >
      <div  className=' w-2/6 h-full'>

      </div>
  
  <div className=' w-full h-full  '>
  <div className="container mx-auto p-4 box-border ">
      <div className="flex flex-col md:flex-row md:space-x-4 justify-center items-center">
        <div className="w-1/3">
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="start-date">
              Start Date
            </label>
            <input
                
                value={startDate}
                onChange={handleStartDateChange}
             
              className="w-full px-3 py-2 border rounded-md"
              type="date"
              id="start-date"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>
        <div className="w-1/3">
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="end-date">
              End Date
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              value={endDate}
              onChange={handleEndDateChange}
              type="date"
              id="end-date"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>
        <div className="w-1/3">
          <div className='mb-4'>
        <label className="block font-bold mb-2" htmlFor="location" >Location</label>
         <CarLocation  onLocationChange={handleLocationChange} />
         </div>
        </div>
        
        <div className="w-1/3">
        <label className="block font-bold mb-2" htmlFor="location">
              search
            </label>
          <div className="mb-4">
            <button onClick={filterCars1} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap w-full ">
      {cars1.map((car) => (
        <Link to={`cardetails?id=${car._id}`}>
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
          <button onClick={()=>{
          navigate(`cardetails?id=${car._id}`)
          }}  className="flex items-center w-full justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
           
            Rent the Car
          </button>
          
        </div>
      </div>
      </Link>
        ))}
        
      </div>




  </div>


    </div>
    
    
   
  )}

export default Car
