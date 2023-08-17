const mongoose = require('mongoose');
const hostSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    is_car:{
        type:Boolean,
        default:false
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    image:{
        type:Array,
        required:true
    }

})
module.exports = mongoose.model('Host',hostSchema);