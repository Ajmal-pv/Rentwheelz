const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  subscribed_cars: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  is_blocked: {
    type: Boolean,
    default: false,
  },
  Reason_For_Block:{
    type:String
  },
  is_host:{
    type:Boolean,
    default:false
  },
  profileImage:[{ type: String }],
  
  LicenseImage:[{ type: String }]

});
module.exports = mongoose.model("User", userSchema);
