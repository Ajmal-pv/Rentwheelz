
const mongoose = require("mongoose")
require('dotenv').config()
const mongoUrl = process.env.mongoUrl;

function dbConfig(){
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoUrl)
        
    } catch (error) {
       console.log(error.message); 
    }
   
    
}
module.exports={
    dbConfig
}