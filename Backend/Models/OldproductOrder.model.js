const {model,Schema} = require("mongoose")
const OldproductOrderSchema = new Schema ({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
    },
    productId: {
    type: Schema.Types.ObjectId,
    ref: 'OldProducts',
    required: true
    },
    userName:{
      type:String,
      required:true
    },
    productName:{
      type:String,
      required:true
    },
    sellerName:{
      type:String,
      required:true
    },
} ,{ timestamps: true })
module.exports = model("OldProductOrder", OldproductOrderSchema)