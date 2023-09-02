const Admin = require("../models/admin");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Car = require('../models/car')
const Host = require('../models/host')
require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('../models/user')


const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

module.exports={
adminSignin:async(req,res)=>{
    try {
        const adminLOGIN={
            message:null,
            status:null,
            token:null,
            id:null,
            name:null,
            token:null
        }
        let {email,password}= req.body.values
        const adminFind = await Admin.findOne({email:email})

        if (!adminFind) {
        
            emailLOGIN.message = 'Your email is not registered';
            return res.send({ adminLOGIN });
          }
          const isMatch = await bcrypt.compare(password, adminFind.password);
          if (isMatch) {
            // If password matches, create and send a JWT token for authentication
            const token = jwt.sign({ id: adminFind._id , role:'admin'}, process.env.JWT_SECRET, {
              expiresIn: "30d",
            });
    
            adminLOGIN.status = true;
            adminLOGIN.token = token;
            adminLOGIN.id = adminFind._id;
            adminLOGIN.name = adminFind.name;
           
    
           
            res.status(200).send({ adminLOGIN });
          } else {
    
            adminLOGIN.message = "Password is wrong";
            res.send({ adminLOGIN });
          }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
},
adminCheck:async(req,res)=>{
  try {
      
    const admin_id = req.user.id;

    const adminFind = await Admin.findOne({ _id: admin_id });

    if (!adminFind) return res.status(400).send({ message: 'User not found' });

    res.status(200).send({ status:true });
  } catch (error) {
   
    res.status(500).send("Server Error");
  }
},
cars:async(req,res)=>{
  try {
   
  const cars= await Car.find().populate('hostId');
  const blockedCars = cars.filter(car => car.approved === 'Blocked');
const pendingCars = cars.filter(car => car.approved === 'Pending');
const approvedCars = cars.filter(car => car.approved === 'Approved');

const sortLatestFirst = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
cars.sort(sortLatestFirst)
blockedCars.sort(sortLatestFirst);
pendingCars.sort(sortLatestFirst);
approvedCars.sort(sortLatestFirst);

cars.reverse()
blockedCars.reverse();
pendingCars.reverse();
approvedCars.reverse();

console.log('Blocked Cars:', blockedCars);
console.log('Pending Cars:', pendingCars);
console.log('Approved Cars:', approvedCars);
  

  if(cars){
   res.send({carData:cars,carBlocked:blockedCars,carPending:pendingCars,carApproved:approvedCars,cars:true})
  }else{
  res.send({cars:false})
  }

    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
},
carBlock:async(req,res)=>{
try {
  const carId=req.query.id
  if(carId){
    const carData= await Car.findOne({_id:carId})

    if(carData){
      carData.approved='Blocked'
     const carSave= carData.save()
     if(carSave){
    res.send({carBlock:true})
  }
  }
  }else{
    res.send({carBlock:false})
  }
} catch (error) {
  console.log(error.message);
    res.status(500).send("Server Error");
}
},
hosts:async(req,res)=>{
  try {
  const hosts= await Host.find()

  if(hosts){
   res.send({hostData:hosts,hosts:true})
  }else{
  res.send({hosts:false})
  }

    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
},
users:async(req,res)=>{
try {
  const users=await User.find()
  if(users){
    res.send({userData:users,users:true})
   }else{
   res.send({users:false})
   }
} catch (error) {
  console.log(error.message);
  res.status(500).send("Server Error");
}
},
userBlock:async(req,res)=>{
try {
  const {userId,reason}= req.body
  const userFind= await User.findOne({_id:userId})
  if(userFind){
    userFind.is_blocked=true
    userFind.blockReason=reason
    const userData= userFind.save()
   return res.send({message:'user Blocked',userBlock:true})
  }else{
    return res.send({userBlock:false})
  }
  

  
} catch (error) {
  console.log(error.message);
  res.status(500).send("Server Error");
}
},
userUnBlock:async(req,res)=>{
try {
  const {userId}= req.body
  const userFind= await User.findOne({_id:userId})
  if(userFind){
    userFind.is_blocked=false
    userFind.blockReason=''
    const userData= userFind.save()
   return res.send({message:'user unBlocked',userUnBlock:true})
  }else{
    return res.send({userBlock:false,message:'error in blocking user'})
  }
  

  
} catch (error) {
  console.log(error.message);
  res.status(500).send("Server Error");
}
},
carDetails:async(req,res)=>{
  try {
    const carId=req.query.id
    const carInfo= await Car.findOne({_id:carId}).populate('hostId')
    console.log(carInfo);
    if(carInfo){
      res.send({carData:carInfo,car:true})
     }else{
     res.send({car:false})
     }

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
},
carApproval:async(req,res)=>{
  try {
    console.log(req.body);
    const{carId,rentalPrice}=req.body
    const carInfo= await Car.findOne({_id:carId}).populate('hostId')
    if(carInfo){
      carInfo.approved='Approved'
      carInfo.rentalPrice=rentalPrice;
     const updatedCar= await carInfo.save();
     if(updatedCar){

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
      const mailOptions = {
        from: 'ajmalpv66@gmail.com',
        to: carInfo.hostId.email,
        subject: 'Car Verification completed',
        text: `Your ${carInfo.licenseNumber} ${carInfo.carModel} has verfied by Admin,You are now eligible to earn up to ${rentalPrice} rps per month through renting,Log in back to RentWheelz at http://localhost:5173/host for more details.  `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
         return res.status(500).json({ message: 'Failed to send OTP.' });
        } else {
          console.log('Email sent: ' + info.response);
          res.json({ status: true, message: 'OTP sent successfully.' });
        }
      });

      const hostData= await Host.findOne({_id:carInfo.hostId._id})
      hostData.is_verified=true;
      const hostSave= await hostData.save()
     if(hostSave){
      return res.send({update:true,message:'Database updated'})
     }
    }

    }else{
     return res.send({message:'Car is not in database'})
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
},
carReject:async(req,res)=>{
  try {
   
    const {carId,rejectReason}=req.body
   
    const carInfo= await Car.findOne({_id:carId})
    if(carInfo){
      carInfo.approved='Rejected'
      carInfo.rejectReason=rejectReason;
     
     const updatedCar= await carInfo.save();
     if(updatedCar){
     return res.send({update:true,message:'Database updated'})
     }

    }else{
     return res.send({message:'Car is not in database'})
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
}
}
