const {Schema,model} = require("mongoose")
const OrderSchema  =  new Schema({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
         
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
       productName: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }
  ],
  address: {
     firstName:{
      type:String,
      required:true
     },
     lastName:{
      type:String,
      required:true
     },
     phone:{
      type:Number,
      required:true
     },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'India'
    }
  },
  payment: {
    type: String,
    enum: ['COD', 'Online'],
    default: 'COD'
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  payment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Payment',
    required: false
  },
}, { timestamps: true });
module.exports = model("Order",OrderSchema)