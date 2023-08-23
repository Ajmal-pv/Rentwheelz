const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
  licenseNumber: { type: String, required: true },
  carModel: { type: String, required: true },
  city: { type: String, required: true },
  fuelType: { type: String, enum: ['petrol', 'Diesel', 'electric', 'hybrid'], },
  kmDriven: { type: String, required: true },
  carBrand: { type: String, required: true },
  carVariant: { type: String, required: true },
  yearOfManufacture: { type: String, required: true },
  transmissionType: { type: String, enum: ['manual', 'automatic'] },
  monthsOfRenting: { type: String, required: true },
  images: [{ type: String }]
  
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
