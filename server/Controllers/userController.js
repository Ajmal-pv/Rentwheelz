const User = require('../models/user');
// const { Vonage } = require("@vonage/server-sdk");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const nodemailer = require('nodemailer');
const Car = require('../models/car');
const Host = require('../models/host');

// const vonage = new Vonage({
//   apiKey: '095abb2b',
//   apiSecret: 'U2RYhGMFWdH6UQEE',
// });
const otpStorage = {};
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;


function generateOTP(length) {
  const charset = '0123456789'; // You can customize the character set if needed
  let otp1 = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp1 += charset[randomIndex];
  }

  return otp1;
}


module.exports = {
  // Function to handle user creation and OTP verification
  userCreation: async (req, res) => {
    try {
      const { email, mobile } = req.body;

      // Check if the email and mobile number already exist in the database
      let useremail = await User.findOne({ email: email });
      let usermobile = await User.findOne({ mobile: mobile });


      if (!useremail && !usermobile) {





        const otp = generateOTP(4);
        otpStorage[email] = otp;
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });
        const mailOptions = {
          from: 'ajmalpv66@gmail.com',
          to: email,
          subject: ' RentWheelz OTP Verification Code',
          text: `Your OTP code for RentWheelz is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send OTP.' });
          } else {
            console.log('Email sent: ' + info.response);
            res.json({ status: true, message: 'OTP sent successfully.' });
          }
        });

      } else {
        // If email or mobile already exists, send appropriate error messages
        if (useremail) {
          return res.status(400).json({ message: 'Email already exists' });
        } else {
          return res.status(400).json({ message: 'Mobile already exists' });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },

  // Function to handle OTP verification and user registration
  userVerify: async (req, res) => {
    try {
      const { email, mobile, password, name, otp1, id } = req.body;
      // console.log(otp2);


      if (otp1 === otpStorage[email]) {
        //  Hash the password and create a new user object
        const spassword = await bcrypt.hash(password, 10);
        const user = new User({
          name: name,
          email: email,
          mobile: mobile,
          password: spassword,
        });
        delete otpStorage[email];
        // Save the user data to the database
        const userData = await user.save();
        return res.json({
          ready: true,
          message: "User Created",
          user: userData,
        });
      } else {
        res.json({ message: 'Invalid OTP.' });
      }

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },

  // Function to handle user sign-in and JWT generation
  userSignin: async (req, res) => {
    try {
      const userLOGIN = {
        status: false,
        message: null,

        name: null,
        id: null,
        email: null,
        mobile: null,
        host:false,
        token:null
      };
      const { email, password } = req.body;

      // Check if the user with the provided email exists
      const user = await User.findOne({ email });
     

      if (!user) {

        userLOGIN.message = 'Your email is not registered';
        return res.send({ userLOGIN });
      }
     
   if(user.is_blocked ){
    userLOGIN.message = 'Your Account is blocked';
        return res.send({ userLOGIN });
   }

      const isMatch = await bcrypt.compare(password, user.password);


      if (isMatch) {
        // If password matches, create and send a JWT token for authentication
        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        if(user.is_host){
          userLOGIN.host=true
        }

        userLOGIN.status = true;

        userLOGIN.id = user._id;
        userLOGIN.name = user.name;
        userLOGIN.email = user.email;
        userLOGIN.mobile = user.mobile
        userLOGIN.token=token


      

        res.status(200).send({ userLOGIN });
      } else {

        userLOGIN.message = "Password is wrong";
        res.send({ userLOGIN });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },

  // Function to handle user details retrieval based on the provided JWT
  userCheck: async (req, res) => {
    try {

      const user_id = req.user.id;

      const userFind = await User.findOne({ _id: user_id });
      
      if (!userFind) return res.status(400).send({ message: 'User not found' });

      if(userFind.is_blocked) return res.status(400).send({ message: 'User is blocked' }); 

      res.status(200).send({ status: true,
                            user:userFind });
    } catch (error) {

      res.status(500).send("Server Error");
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body.values

      const userFind = await User.findOne({ email: email })
      if (!userFind) {
        return res.status(404).json({ message: 'No account with this email' })
      }
      // const fullMobile = `+91${mobile}`;
      // vonage.verify
      //   .start({
      //     number: fullMobile,
      //     brand: "RentWheelz",
      //   })
      //   .then((resp) => {
      //     // Return response with request_id for OTP verification
      //     res.json({
      //       status: true,
      //       id: resp.request_id,
      //       user: userFind._id
      //     });
      //   })
      //   .catch((err) => {

      //     console.log(err, 'verification');
      //   })
      const otp = generateOTP(4);
      otpStorage[email] = otp;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
      const mailOptions = {
        from: 'ajmalpv66@gmail.com',
        to: email,
        subject: ' RentWheelz OTP Verification Code',
        text: `Your OTP code for RentWheelz is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'Failed to send OTP.' });
        } else {
          console.log('Email sent: ' + info.response);
          res.json({
            status: true,
            user: userFind._id,
            message: 'OTP sent successfully.'
          });
        }
      });


    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  forgotOtp: async (req, res) => {
    try {
      const { otp } = req.body.values
      const { user } = req.body
      const userFind = await User.findOne({ _id: user })
      if (otp === otpStorage[userFind.email]){
        
            return res.json({
              status: true,
              message: "Otp verified",
              user: userFind._id,
            });
      }else{
        return res.json({ message: 'wrong otp' });
      }

      // vonage.verify
      //   .check(vonage1, otp)
      //   .then(async (resp) => {
      //     // Check if the OTP is correct
      //     if (resp.status !== '0') return res.json({ message: 'wrong otp' });
      //     const userFind = await User.findOne({ _id: user })
      //     return res.json({
      //       status: true,
      //       message: "Otp verified",
      //       user: userFind._id,
      //     });
      //   })
      //   .catch((err) => console.error(err));

   

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  passwordSet: async (req, res) => {
    try {
      const { newPassword } = req.body.values;
      const { user } = req.body;

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      const updatedUser = await User.updateOne({ _id: user }, { $set: { password: hashedPassword } });


      return res.json({
        status: true,
        message: 'Password updated successfully',
      });




    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  },
  getCars:async(req,res)=>{
    try {
      const cars = await Car.find({
        is_subscribed: false,
        approved: "Approved",
        isCarRented: true,
        approved: { $ne: "Blocked" }
      });
      
        if(cars){
         return res.send({status:true,cars:cars})}
         
         
         
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
    }
  }

