import React, { useEffect, useState,Fragment } from 'react'

import { cars } from '../../../services/user-Service'
import { Link, useNavigate } from 'react-router-dom'
import CarLocation from './CarLocation'
import { Toaster, toast } from 'react-hot-toast'





function Car() {

  const [isOpenBrand, setIsOpenBrand] = useState(false)
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);

  const toggleDropdownBrand = () => {
    setIsOpenBrand(!isOpenBrand)
  };
  const toggleDropdownColor = () => {
    setIsOpenColor(!isOpenColor)
  };
  const toggleDropdownModel = () => {
    setIsOpenModel(!isOpenModel)
  };
 // State for selected options in each filter category
 const [selectedBrandOptions, setSelectedBrandOptions] = useState([]);
 const [selectedColorOptions, setSelectedColorOptions] = useState([]);
 const [selectedModelOptions, setSelectedModelOptions] = useState([]);
  // const [selectedOptions, setSelectedOptions] = useState([]);

  // const handleOptionSelect = (option) => {
  //   if (selectedOptions.includes(option.value)) {
  //     // If the option is already selected, remove it
  //     setSelectedOptions(selectedOptions.filter((value) => value !== option.value));
  //   } else {
  //     // If the option is not selected, add it
  //     setSelectedOptions([...selectedOptions, option.value]);
  //   }
  // };
   // Function to handle checkbox selection
   const handleOptionSelect = (option, category) => {
    switch (category) {
      case 'Brand':
        setSelectedBrandOptions([option]);
        break;
      case 'Color':
        setSelectedColorOptions([option]);
        break;
      case 'Model':
        setSelectedModelOptions([option]);
        break;
      default:
        break;
    }
  };

  

  
  
  const navigate = useNavigate()
    
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [allcar,setAllcar]=useState([])
    const[cars1,setCars1]=useState(allcar)
    const [location, setLocation] = useState('');
    const [brands, setBrands] = useState('');
    const [models, setModels] = useState('');
    const [colors, setColors] = useState('');
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
   setBrands(res.data.result.distinctBrands)
   setModels(res.data.result.distinctModels)
   setColors(res.data.result.distinctColors)
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
    
      
    }, [])

   
    const [filteredCars, setFilteredCars] = useState([]);
  
    // Handle input changes for start date, end date, and location
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };
  
    useEffect(()=>{
     if(selectedBrandOptions){
      
      const filter =cars1.filter((car)=>{
        return(
            car.Brand == selectedBrandOptions
        )
      })
      setCars1(filter)
     }
     
  
     
    },[selectedBrandOptions])
    useEffect(()=>{
      if(selectedModelOptions){
      
        const filter =cars1.filter((car)=>{
          return(
              car.model === selectedModelOptions
          )
        })
        setCars1(filter)
       }
    },[selectedModelOptions])
    useEffect(() => {
      if (selectedColorOptions.length > 0) {
        
      
        const filteredCars = cars1.filter((car) => {
          // Check if the car's color is in the selectedColorOptions array
          return selectedColorOptions.includes(car.color);
        });
    
        console.log(filteredCars);
        setCars1(filteredCars);
      } else {
        // If no color options are selected, reset to the original list
        setCars1(allcar); // Assuming you have the original car data stored in `allCars`
      }
    }, [selectedColorOptions]);


  
    // // Function to filter cars based on user input
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
      )
      
      });
    
      setCars1(filtered);}
    };

    
   
  
  
   
    
    
  return (

    <div className='flex flex_col h-[100vh]' >
       <div className='w-2/6 h-full border-b-2 border-gray-700   p-5'>
         <div>
    <h1 className='font-serif mb-4 border-b-2 text-xl border-gray-300  m-2'>Filters</h1>
    {/* <div className="relative m-2 ">
     
      <button
        className="flex items-center justify-between w-full p-2 cursor-pointer"
        onClick={toggleDropdownBrand}
      >
        <span>BRAND</span>
        <span className="ml-2">&#9660;</span>
      </button>

    
      {isOpenBrand && (
        <div >
          {brands.map((option) => (
            <label
              key={option.value}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              
              <input
                type="checkbox"
                name="filterOptionBrand"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div> */}
    {/* <div className="relative m-2 ">
  
      <button
        className="flex items-center justify-between w-full p-2 cursor-pointer"
        onClick={toggleDropdownColor}
      >
        <span>COLOR</span>
        <span className="ml-2">&#9660;</span>
      </button>

    
      {isOpenColor && (
        <div >
          {colors.map((option) => (
            <label
              key={option.value}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              
              <input
                type="checkbox"
                name="filterOptionColor"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div> */}
    {/* <div className="relative m-2 ">
     
      <button
        className="flex items-center justify-between w-full p-2 cursor-pointer"
        onClick={toggleDropdownFuel}
      >
        <span>Model</span>
        <span className="ml-2">&#9660;</span>
      </button>

  
      {isOpenFuel && (
        <div >
          {models.map((option) => (
            <label
              key={option.value}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              
              <input
                type="checkbox"
                name="filterOptionModel"
                value={option}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div> */}

<div className="relative m-2">
        {/* Filter button to toggle the dropdown */}
        <button
          className="flex items-center justify-between w-full p-2 cursor-pointer"
          onClick={toggleDropdownBrand}
        >
          <span>BRAND</span>
          <span className="ml-2">&#9660;</span>
        </button>

        {/* Dropdown options */}
        {isOpenBrand && (
          <div>
            {brands.map((option) => (
              <label
                key={option}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="filterOptionBrand"
                  value={option}
                  checked={selectedBrandOptions.includes(option)}
                  onChange={() => handleOptionSelect(option, 'Brand')}
                  className='m-2'
                />
                  {  option}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="relative m-2">
        {/* Filter button to toggle the dropdown */}
        <button
          className="flex items-center justify-between w-full p-2 cursor-pointer"
          onClick={toggleDropdownColor}
        >
          <span>COLOR</span>
          <span className="ml-2">&#9660;</span>
        </button>

        {/* Dropdown options */}
        {isOpenColor && (
          <div>
            {colors.map((option) => (
              <label
                key={option}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="filterOptionColor"
                  value={option}
                  checked={selectedColorOptions.includes(option)}
                  onChange={() => handleOptionSelect(option, 'Color')}
                  className='m-2'
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="relative m-2">
        {/* Filter button to toggle the dropdown */}
        <button
          className="flex items-center justify-between w-full p-2 cursor-pointer"
          onClick={toggleDropdownModel}
        >
          <span>Model</span>
          <span className="ml-2">&#9660;</span>
        </button>

        {/* Dropdown options */}
        {isOpenModel && (
          <div>
            {models.map((option) => (
              <label
                key={option}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="filterOptionModel"
                  value={option}
                  checked={selectedModelOptions.includes(option)}
                  onChange={() => handleOptionSelect(option, 'Model')}
                  className='m-2'
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
         </div>
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
      {cars1?.map((car) => (
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
<Toaster/>

    </div>
    
    
   
  )}

export default Car



