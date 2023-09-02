import React, { useEffect, useState } from 'react'
import { RentCar, carDetails } from '../../../services/host-service';
import { useLocation } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarDetails() {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get("id");
    const [car, setCar] = useState({});
    const [showCarImages, setShowCarImages] = useState(true);
    const [verificationDone, setVerificationDone] = useState(false);
    const [startDate, setStartDate] = useState('');
     const [endDate, setEndDate] = useState('');
    const toggleImages = () => {
        setShowCarImages(!showCarImages);
      };
     
  const handleRentSubmit = () => {
    if(carId){
    RentCar(carId,startDate,endDate).then((res)=>{
        if(res.data.status){
            setVerificationDone(true)
        }

    })
}
  };
    useEffect(() => {
        if (carId) {
          carDetails(carId)
            .then((res) => {
              if (res.data.car) {
                setCar(res.data.carData);
              } else {
                setCar({});
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [verificationDone]);

  return (
    <div className=" w-full p-4 ">
    <h1 className=" ml-4  mb-8 mt-6 font-semibold   border-gray-800 text-2xl">
      CAR DETAILS
    </h1>
    <div className=" w-full h-4/6 mt-14 flex flex-row p-4  ">
      
      <div className="w-1/4 h-full flex items-center justify-center  border-4 border-white-500 rounded-lg">
        <div className="flex flex-col items-start space-y-1 text-l leading-8 ">
          <h1>
            <span className="font-bold">License Number:</span>{" "}
            {car.licenseNumber}
          </h1>
          <h1>
            <span className="font-bold">Car Model:</span> {car.carModel}
          </h1>
          <h1>
            <span className="font-bold">City:</span> {car.city}
          </h1>
          <h1>
            <span className="font-bold">Fuel Type:</span> {car.fuelType}
          </h1>
          <h1>
            <span className="font-bold">Kilometers Driven:</span>{" "}
            {car.kmDriven}
          </h1>
          <h1>
            <span className="font-bold">Car Brand:</span> {car.carBrand}
          </h1>
          <h1>
            <span className="font-bold">Car Variant:</span> {car.carVariant}
          </h1>
          <h1>
            <span className="font-bold">Year of Manufacture:</span>{" "}
            {car.yearOfManufacture}
          </h1>
          <h1>
            <span className="font-bold">Transmission Type:</span>{" "}
            {car.transmissionType}
          </h1>
         
          <h1>
<span className="font-bold">current status:</span>{" "}
{car.is_subscribed === true ? "Rented" : "Available"}
</h1>
{car.rentalPrice  &&(
          <h1>
            <span className="font-bold">Month Rent:</span>{" "}
            {car.rentalPrice}
          </h1>
          )}
        
        </div>
      </div>

      {/* <div className=" ml-4  w-2/4  border-4 border-white-500 rounded-lg ">
        {car.images && (
          <Carousel className="w-full h-full mt-6" showThumbs={false}>
            {car.images.map((image, index) => (
              <div key={index} className="w-full h-full">
                <img
                  src={image}
                  alt={`Car Image ${index}`}
                  className="w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div> */}
       <div className="ml-4 w-2/4 border-4 border-white-500 rounded-lg">
    <div className="flex justify-center mt-2">
      <button
        onClick={toggleImages}
        className={`mr-4 ${
          showCarImages ? 'bg-blue-500' : 'bg-gray-400'
        } text-white px-3 py-1 rounded`}
      >
        Car Images
      </button>
      <button
        onClick={toggleImages}
        className={`${
          showCarImages ? 'bg-gray-400' : 'bg-blue-500'
        } text-white px-3 py-1 rounded`}
      >
        RC Images
      </button>
    </div>

    {showCarImages ? car.images && (
      <Carousel className="w-full h-80 mt-6" showThumbs={false}>
        {car.images.map((image, index) => (
          <div key={index} className="w-full h-80">
            <img
              src={image}
              alt={`Car Image ${index}`}
              className=" h-80 "
            />
          </div>
        ))}
      </Carousel>
    ) : car.RcImages && (
      <Carousel className="w-full h-80 mt-6" showThumbs={false}>
        {/* Render your RC images here */}
        {car.RcImages.map((image, index) => (
          <div key={index} className="w-full h-80">
            <img
              src={image}
              alt={`Car Image ${index}`}
              className="w-full h-80"
            />
          </div>
        ))}
      </Carousel>
    )}
  </div>
     
  {car.isCarRented ? (
        <div className="flex flex-col items-center border-4 border-white-500 rounded-lg h-full ml-4 w-1/4">
          <div className="h-full flex flex-col justify-center items-start space-y-2 text-l leading-8">
            <p className="font-bold">End Date of Rental:</p>
            <p>{car.rentalEndDate}</p>
          </div>
        </div>
      ) : (<div className="flex flex-col items-center border-4 border-white-500 rounded-lg h-full ml-4 w-1/4">
        <div className="h-full flex flex-col justify-center items-start space-y-2 text-l leading-8">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="End Date"
          />
          <button
            onClick={handleRentSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Rent Car
          </button>
        </div>
      </div>
      
   
      )}
    </div>
    

  </div>
  )
}

export default CarDetails
