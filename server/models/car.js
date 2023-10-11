const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "Host", required: true },
  RegistrationNumber: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  model: { type: String, required: true },
  pickUpArea: { type: String, required: true },
  fuelType: { type: String },
  kmDriven: { type: String, required: true },
  Brand: { type: String, required: true },
  Variant: { type: String, required: true },
  yearOfManufacture: { type: String, required: true },
  transmissionType: { type: String },
  images: [{ type: String }],
  RcImages: [{ type: String }],
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Blocked"],
    default: "Pending",
  },
  is_subscribed: { type: Boolean, default: false },
  subscriber: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rejectingCause: { type: String },
  rentalPrice: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  isCarRented: { type: Boolean, default: false },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
