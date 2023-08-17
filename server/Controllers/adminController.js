const Admin = require("../models/admin");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



module.exports={
adminSignin:async(req,res)=>{
    try {
        const adminLOGIN={
            message:null,
            status:null,
            token:null,
            id:null,
            name:null
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
           
    
            // Set the JWT as a cookie to be sent with subsequent requests for authentication
            res.cookie("admin", token, {
              httpOnly: false,
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
    
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
}
}
