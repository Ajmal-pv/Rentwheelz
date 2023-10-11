const Host = require("../models/host");
const Car = require("../models/car");
const Order = require("../models/carOrder");
const { Vonage } = require("@vonage/server-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const nodemailer = require("nodemailer");

const otpStorage = {};
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

function generateOTP(length) {
  const charset = "0123456789"; // You can customize the character set if needed
  let otp1 = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp1 += charset[randomIndex];
  }

  return otp1;
}

module.exports = {
  // Function to handle user creation and OTP verification
  hostCreation: async (req, res) => {
    try {
      const { email, mobile } = req.body;

      // Check if the email and mobile number already exist in the database
      let Hostemail = await Host.findOne({ email: email });
      let Hostmobile = await Host.findOne({ mobile: mobile });
      const fullMobile = `+91${mobile}`;

      if (!Hostemail && !Hostmobile) {
        // If email and mobile are not found, start the Vonage verification process

        // vonage.verify
        //   .start({
        //     number: fullMobile,
        //     brand: "RentWheelz",
        //   })
        //   .then((resp) => {
        //     // Return response with request_id for OTP verification
        //     console.log('success');

        //     res.json({
        //       status: true,
        //       id: resp.request_id,
        //     });
        //   })
        //   .catch((err) => console.error(err));

        const otp = generateOTP(4);
        otpStorage[email] = otp;
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });
        const mailOptions = {
          from: "ajmalpv66@gmail.com",
          to: email,
          subject: " RentWheelz OTP Verification Code",
          text: `Your OTP code for RentWheelz is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Failed to send OTP." });
          } else {
            console.log("Email sent: " + info.response);
            res.json({ status: true, message: "OTP sent successfully." });
          }
        });
      } else {
        // If email or mobile already exists, send appropriate error messages
        if (Hostemail) {
          return res.status(400).json({ message: "Email already exists" });
        } else {
          return res.status(400).json({ message: "Mobile already exists" });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  hostVerify: async (req, res) => {
    try {
      const { email, mobile, password, name, otp } = req.body;

      if (otp !== otpStorage[email]) {
        return res.json({ message: "wrong otp" });
      } else {
        const spassword = await bcrypt.hash(password, 10);
        const host = new Host({
          name: name,
          email: email,
          mobile: mobile,
          password: spassword,
        });

        // Save the user data to the database
        const hostData = await host.save();
        return res.json({
          ready: true,
          message: "hoat Created",
          host: hostData,
        });
      }

      // Verify the OTP using Vonage API
      // vonage.verify
      //   .check(id, otp)
      //   .then(async (resp) => {
      //     // Check if the OTP is correct
      //     if (resp.status !== '0') return res.json({ message: 'wrong otp' });

      //     // Hash the password and create a new user object
      //     const spassword = await bcrypt.hash(password, 10);
      //     const host = new Host({
      //       name: name,
      //       email: email,
      //       mobile: mobile,
      //       password: spassword,
      //     });

      //     // Save the user data to the database
      //     const hostData = await host.save();
      //     return res.json({
      //       ready: true,
      //       message: "hoat Created",
      //       host: hostData,
      //     });
      //   })
      // .catch((err) => console.error(err));
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  carAdd: async (req, res) => {
    try {
      console.log(req.body, "hereee");
      const { values, downloadedUrls, host, downloadDocumentUrls, query } =
        req.body;
      console.log(host);

      const hostFind = await Host.findOne({ _id: host });

      if (!hostFind) return res.status(404).json({ message: "Host not found" });

      const newCar = new Car({
        hostId: hostFind._id,
        RegistrationNumber: values.RegistrationNumber,
        discription: values.discription,
        color: values.carColor,
        carModel: values.carModel,
        city: query,
        fuelType: values.fuelType,
        kmDriven: values.kmDriven,

        carBrand: values.carBrand,
        carVariant: values.carVariant,
        yearOfManufacture: values.yearOfManufacture,
        transmissionType: values.transmissionType,
        monthsOfRenting: values.monthsOfRenting,
        images: downloadedUrls,
        RcImages: downloadDocumentUrls,
      });
      const carData = await newCar.save();

      const user = await User.findOne({ email: hostFind.email });
      if (user) {
        user.is_host = true;
        user.save();
      }

      const hostData = await Host.findByIdAndUpdate(
        { _id: host },
        { $set: { is_car: true } },
        { new: true }
      );

      return res.json({
        status: true,
        message: "New Car added",
        host: hostData,
        car: carData,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  hostSignin: async (req, res) => {
    try {
      const HostLOGIN = {
        status: false,
        message: null,
        token: null,
        name: null,
        id: null,
        host: null,
        user: false,
      };
      const { email, password } = req.body;
      const host = await Host.findOne({ email });

      if (!host) {
        HostLOGIN.message = "Your email is not registered";
        return res.send({ HostLOGIN });
      }

      const isMatch = await bcrypt.compare(password, host.password);

      if (isMatch) {
        // If password matches, create and send a JWT token for authentication
        const token = jwt.sign(
          { id: host._id, role: "host" },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );

        HostLOGIN.status = true;
        HostLOGIN.token = token;
        HostLOGIN.id = host._id;
        HostLOGIN.name = host.name;
        HostLOGIN.host = host;

        res.status(200).send({ HostLOGIN });
      } else {
        HostLOGIN.message = "Password is wrong";
        res.send({ HostLOGIN });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  // Function to handle user details retrieval based on the provided JWT
  hostCheck: async (req, res) => {
    try {
      const host_id = req.user.id;

      const hostFind = await Host.findOne({ _id: host_id });

      if (!hostFind) return res.status(400).send({ message: "User not found" });

      res
        .status(200)
        .send({ status: true, hostData: hostFind, hostid: host_id });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },
  hostCars: async (req, res) => {
    try {
      const hostId = req.query.id;
      const hostCars = await Car.find({ hostId: hostId });

      if (hostCars) {
        res.send({ status: true, Cars: hostCars });
      } else {
        res.send({ status: false });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  carDetails: async (req, res) => {
    try {
      const carId = req.query.id;
      const carInfo = await Car.findOne({ _id: carId });
      console.log(carInfo);
      if (carInfo) {
        res.send({ carData: carInfo, car: true });
      } else {
        res.send({ car: false });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  carRent: async (req, res) => {
    try {
      const { carId, startDate, endDate } = req.body;
      const car = await Car.findOne({ _id: carId });
      if (car) {
        car.rentalStartDate = startDate;
        car.rentalEndDate = endDate;
        car.isCarRented = true;
        const carData = car.save();
        if (carData) {
          res.send({ status: true, carData: carData });
        } else {
          res.send({ status: false });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  Bookedcars: async (req, res) => {
    try {
      const hostId = req.query.id;
      const hostCars = await Order.find({ host: hostId })
        .populate("car")
        .populate("user");
      if (hostCars) {
        res.send({ Bookings: hostCars, status: true });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  cancelBooking: async(req,res)=>{
    try {
      const {BookingId,reason} = req.body
      const booking = await Order.findOne({_id:BookingId})
      if(booking){
        booking.status='Cancelled'
        booking.cancelReason=reason
        const BookingData = booking.save()
        if(BookingData){

        return res.send({ message: 'booking Canceled', bookingCancel: true })
      }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
};
