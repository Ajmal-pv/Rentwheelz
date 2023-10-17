import React, { useEffect, useState } from "react";
import moment from 'moment';
import { useLocation, useNavigate } from "react-router-dom";
import {
  Singlcar,
  callStripe,
  datesSelected,
} from "../../../services/user-Service";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarLocation from "./CarLocation";

const CarDetails = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get("id");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [price, setPrice] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  const userToken = localStorage.getItem("userToken");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    datesSelected(carId).then((res) => {
      if (res.data.status) {
        setDisabledDates(res.data.carDates);
      }
    });
  }, []);

  useEffect(() => {
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
        console.error(error);
      });
  }, [car])
  useEffect(() => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      const isOverlap = isRangeOverlapDisabled(startDateObj, endDateObj);
      if (isOverlap) {
        setStartDate("")
        setEndDate("")
        toast.error('Please select valid dates')
        return 
      }
      if (startDateObj > endDateObj) {
        setStartDate("");
        setEndDate("");
        toast.error('Start date cannot be after end date');
        return;
      }
      const pricePerDay = car.rentalPrice;

      const numberOfDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
      const total = pricePerDay * (numberOfDays);

      setPrice(total);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;

    setStartDate(selectedDate);
  };
  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;

    setEndDate(selectedDate);
  };

  // const disabledDates = [new Date("2023-09-19"), new Date("2023-09-22")];

  const isDateDisabled = (date) => {
    const normal = () => {
      return (
        date >= new Date(car.startDate) &&
        date <= new Date(car.endDate)
      );
    };

    // Check if the date is within any of the disabled date ranges
    const isDisabledDate = disabledDates.some((disabledDate) => {
      return (
        date >= new Date(disabledDate.startDate) &&
        date <= new Date(disabledDate.endDate)
      );
    });

    return normal() && !isDisabledDate;
  };
  const handleLocationChange = (newLocation) => {
    setDropOff(newLocation);
  };

  const isRangeOverlapDisabled = (startDate, endDate) => {
    for (const disabledRange of disabledDates) {
      const disabledStartDate = new Date(disabledRange.startDate);
      const disabledEndDate = new Date(disabledRange.endDate);

      // Check if the disabled range overlaps with the customer's selected range
      if (
        (startDate <= disabledEndDate && startDate >= disabledStartDate) ||
        (endDate >= disabledStartDate && endDate <= disabledEndDate) ||
        (startDate <= disabledStartDate && endDate >= disabledEndDate)
      ) {
        return true; // There's an overlap with a disabled range
      }
    }
    return false; // No overlap with any disabled range
  };

  const handleNext =()=>{
    if (startDate === "" || endDate === "" || price === null || dropOff==='') {
      return toast.error("Make sure you selected StartDate,EndDate and Drop off location");
    }
   
    if(userToken){
     
      navigate(`/cars/carpayment?pd=${startDate}&dd=${endDate}&id=${carId}&userid=${userId}&hostId=${car.hostId}&pickup=${car.city}&drop=${dropOff}`)

    }else{
      navigate('/login')
    }
  }

  const handleSubmit = () => {
    if (startDate === "" || endDate === "" || price === null || dropOff==='') {
      return toast.error("Make sure you selected StartDate,EndDate and Drop off location");
    }

    if (userToken) {
      callStripe(price, car.carModel,car._id).then((res) => {
        if (res) {
          const orderData = {
            startDate: startDate, // Replace with your start date
            endDate: endDate, // Replace with your end date
            carId: carId,
            userId: userId,
            hostId: car.hostId,
            dropOff:dropOff,
            pickup:car.city
          };
          const orderDataJSON = JSON.stringify(orderData);

          // Store the JSON string in localStorage
          localStorage.setItem("orderData", orderDataJSON);
          window.location.href = res.data.url;
        }
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div >
      <main className="container mx-auto p-6">
        {car && (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="carousel relative shadow-2xl bg-white">
                {car.images && (
                  <Carousel showThumbs={false}>
                    {car.images.map((image, index) => (
                      <div key={index} className="w-full h-auto">
                        <img
                          src={image}
                          alt={`Car Image ${index}`}
                          className="w-full rounded-lg"
                        />
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 pl-10">
              <h1 className="text-3xl font-semibold">
                {car.carBrand} {car.carModel}
              </h1>
              <p className="text-black mb-2 mt-2">{car.discription}</p>

              <div className="flex items-center mb-4 ">
                <span className="text-green-500 font-semibold text-xl mr-2">
                  ₹ {car.rentalPrice}/DAY
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                <span className="text-gray-600 text-sm mr-2">Year:</span>
                <span className="text-black font-semibold">
                  {car.yearOfManufacture}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 text-sm mr-2">Color:</span>
                <span className="text-black font-semibold capitalize">{car.color}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 text-sm mr-2 capitalize">Car Variant:</span>
                <span className="text-black font-semibold capitalize">
                  {car.carVariant}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 text-sm mr-2 capitalize">
                  Transmission:
                </span>
                <span className="text-black font-semibold capitalize">
                  {car.transmissionType}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 text-sm mr-2">Fuel Type:</span>
                <span className="text-black font-semibold capitalize">{car.fuelType}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 text-sm mr-2 capitalize">km Driven:</span>
                <span className="text-black font-semibold capitalize">{car.kmDriven}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 text-sm mr-2">
                  Available till:
                </span>
                <span className="text-red-700 font-semibold">
                  {car.rentalEndDate}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-red-600 text-l mr-2 capitalize">Pick up Location:</span>
                <span className="text-black font-semibold capitalize">{car.city}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-red-600 text-l mr-2 ">
                  DropOff Location
                </span>
               <CarLocation onLocationChange={ handleLocationChange} />
              </div>
              <div className="flex items-center mb-4">
                <span className="text-red-600 text-l mr-2">
                  Rental Period:
                </span>
                
                <DatePicker
                  className=" font-semibold ml-2 rounded-lg border  px-3 py-2 bg-slate-300"
                  selected={startDate}
                  onChange={(date) => {
                    const formattedDate = moment(date).set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
                    setStartDate(formattedDate.toDate())
                  }}
                  minDate={new Date()}
                  filterDate={isDateDisabled} // Use a custom function to disable specific dates
                  showDisabledMonthNavigation
                  placeholderText="dd-mm-yyyy"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
                <span className="text-black font-semibold m-2">to</span>
               
                <DatePicker
                  className="font-semibold ml-2 rounded-lg border px-3 py-2 bg-slate-300"
                  selected={endDate}
                  onChange={(date) => {
                    const formattedDate = moment(date).set({ hour: 21, minute: 0, second: 0, millisecond: 0 })

                   
                    setEndDate(formattedDate.toDate())}}
                  minDate={new Date()}
                  filterDate={isDateDisabled} // Use a custom function to disable specific dates

                  showDisabledMonthNavigation
                  placeholderText="dd-mm-yyyy"
                  dateFormat="MMMM d, yyyy h:mm aa"

                />
              </div>

              {price && (
                <div className="flex items-center mb-4">
                  <span className="text-gray-600 text-sm mr-2">
                    Total amount
                  </span>
                  <span className="text-green-700 font-bold text-xl">
                    {price}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <div className="flex justify-center">
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900"
          onClick={handleNext}
        >
          Rent Now
        </button>
      </div>

      <Toaster />
    </div>
  );
};

export default CarDetails;
