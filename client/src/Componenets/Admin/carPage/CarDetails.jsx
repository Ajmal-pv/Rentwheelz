import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { carApproval, carBlocking, carDetails, carReject } from "../../../services/admin-Service";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2"

function CarDetails() {
  const [car, setCar] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get("id");
  const [showCarImages, setShowCarImages] = useState(true);
  const [verificationDone, setVerificationDone] = useState(false);

  const toggleImages = () => {
    setShowCarImages(!showCarImages);
  };
 

  const carBlock = () => {
    Swal.fire({
      title: "Block Car",
      text: "Do you want to block this car?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          carBlocking(carId).then((res)=>{
            if(res.data.carBlock){
              Swal.fire("Car Blocked", "The car has been blocked.", "success");
              setVerificationDone(true)
            }else{
              Swal.fire("Error", "An error occurred while blocking the car.", "error");
              setVerificationDone(true)
            }


            
          }).catch((error)=>{
            Swal.fire("Error", "An error occurred while blocking the car.", "error");
          })
          
          
        } catch (error) {
          Swal.fire("Error", "An error occurred while blocking the car.", "error");
        }
      }
    });
  };
  const handleVerify = () => {
    Swal.fire({
      title: "Verify Car",
      html: `
    <div>
      <p>Do you want to verify this car?</p>
      <input type="number" id="rentalPrice" placeholder="Enter monthly rental price" class="swal2-input">
    </div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
      cancelButtonText: "Reject",
      showCloseButton: true, // Display the close (cancel) button
  allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const rentalPrice = document.getElementById("rentalPrice").value;

        if (!rentalPrice) {
          Swal.fire("Error", "Please enter a monthly rental price for this car", "error");
          return;
        }
        carApproval(carId,rentalPrice).then((res)=>{
          if(res.data.update){
          Swal.fire("Verified!", "The car has been verified.", "success")
          setVerificationDone(true);
        }else{
          Swal.fire("rejcted", "Then car is not in Database", "fail")
          setVerificationDone(true);
          }
        })

        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Show an input prompt for the reason
        Swal.fire({
          title: "Reject Car",
          input: "textarea",
          inputPlaceholder: "Enter the reason for rejection",
          inputAttributes: {
            'aria-label': 'Reason',
          },
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Reject",
          cancelButtonText: "Cancel",
          showLoaderOnConfirm: true,
          preConfirm: (reason) => {
            if (!reason) {
              Swal.showValidationMessage("Reason is required");
            }
            return new Promise((resolve) => {
              // Simulate an API call with setTimeout
              setTimeout(() => {
                resolve(reason);
              }, 1000);
            });
          },
        }).then((rejectResult) => {
          if (rejectResult.isConfirmed) {
            carReject(carId,rejectResult.value).then((res)=>{
              Swal.fire(
                "Car Rejected",
                `The car has been rejected with reason: ${rejectResult.value}`,
                "error"
              );
              setVerificationDone(true);

            })

          
          } else if (rejectResult.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "The rejection process was cancelled.", "error");
          }
        });
      }
    });
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
        {car.hostId && (
          <div className="  flex flex-col items-center border-4 border-white-500 rounded-lg h-full ml-4 w-1/4">
            <div className="w-full flex justify-center mt-4">
              <span className="font-bold items-center  text-xl">
                {" "}
                Host Details
              </span>
            </div>
            <div className=" h-full  flex flex-col justify-center items-start space-y-2 text-l leading-8">
              <p>
                <span className="font-bold">Name:</span> {car.hostId.name}
              </p>
              <p>
                <span className="font-bold">Email:</span> {car.hostId.email}
              </p>
              <p>
                <span className="font-bold">Mobile:</span> {car.hostId.mobile}
              </p>
              <p>
                <span className="font-bold">Is Car Host:</span>{" "}
                {car.hostId.is_car ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-bold">Is Verified:</span>{" "}
                {car.hostId.is_verified ? "Yes" : "No"}
              </p>
            </div>
            
          </div>
        )}
     
     
      </div>
      { car.approved === "Pending" &&(
      <div className="p-4 flex justify-center ">
  <button  onClick={handleVerify} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Verify
  </button>
</div>
)}
   { car.approved === "Approved" &&(
      <div className="p-4 flex justify-center ">
  <button onClick={carBlock}   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Block Car
  </button>
</div>
)}
 { car.approved === "Rejected" &&(
      <div className="p-4 flex justify-center ">
  <h1   className="bg-red-500 hover:bg-red-700 text-white font-bold ">
    CAR REJECTED:{car.rejectReason}
  </h1>
</div>
)}
 { car.approved === "Blocked" &&(
      <div className="p-4 flex justify-center ">
  <h1   className="bg-red-500 hover:bg-red-700 text-white font-bold ">
    CAR BLOCKED
  </h1>
</div>
)}

    </div>
  );
}

export default CarDetails;
