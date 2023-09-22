const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
     host:{ type: mongoose.Schema.Types.ObjectId, ref: "Host" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    car:{ type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    paymentMethod:{type:String},
    status:{type:String,default:'upcoming'}
});
orderSchema.pre('save', function (next) {
    const currentDate = new Date();
    if (currentDate >= this.startDate && currentDate <= this.endDate) {
      this.status = 'ongoing';
    } else if (currentDate > this.endDate) {
      this.status = 'completed';
    } else {
      this.status = 'upcoming';
    }
    next();
  });
module.exports = mongoose.model("Order", orderSchema);
