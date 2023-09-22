const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "Host", required: true },
  RegistrationNumber: { type: String, required: true },
  discription: { type: String, required: true },
  color:{type:String,required:true},
  carModel: { type: String, required: true },
  city: { type: String, required: true },
  fuelType: { type: String},
  kmDriven: { type: String, required: true },
  carBrand: { type: String, required: true },
  carVariant: { type: String, required: true },
  yearOfManufacture: { type: String, required: true },
  transmissionType: { type: String },
  monthsOfRenting: { type: String, required: true },
  images: [{ type: String }],
  RcImages:[{type:String}],
  approved: {
    type: String,
    enum: ["Pending", "Approved", "Rejected",'Blocked'],
    default: "Pending",
  },
  is_subscribed:{type:Boolean,default:false},
  subscriber:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  rejectReason:{type:String},
  rentalPrice:{type:String},
  rentalStartDate: { type: Date },
  rentalEndDate: { type: Date },
  isCarRented:{type:Boolean,default:false}
  
  
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
