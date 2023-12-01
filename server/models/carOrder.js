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
    status:{type:String,default:'upcoming'},
    cancelReason:{
      type:String
    },
    cancelledby:{type:String},
    paymentStatus:{type:String,
    default:'paid'},
    pickupLocation:{type:String},
    dropOffLocation:{type:String},
    deposit:{type:Number},
    totalAmount:{type:Number,required:true},
    refund:{
      Amount:{type:Number},
      method:{type:String}
    },
    forAdmin:{
      Amount:{type:Number},
      status:{type:Boolean,default:false},
    
    },
    forHost:{
      Amount:{type:Number},
      status:{type:Boolean,default:false}
    }
});
orderSchema.pre('save', function (next) {
    const currentDate = new Date();
    if(this.status !== 'Cancelled'){

    if (currentDate >= this.startDate && currentDate <= this.endDate) {
      this.status = 'ongoing';
    } else if (currentDate > this.endDate) {
      this.status = 'completed';
    } else  {
      this.status = 'upcoming';
    }}
    next();
  });
module.exports = mongoose.model("Order", orderSchema);
