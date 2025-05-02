const { Schema, model } = require("mongoose")
const UsedProductSchema = new Schema({
      id:{
            require: true,
            type: String
      },
      productName: {
            require: true,
            type: String
      },
      productDescription: {
            require: true,
            type: String
      },
      price: {
            require: true,
            type: Number
      },
      category: {
            require: true,
            type: String
      },
      images: [{
            url: {
                  type: String,
                  required: true
            }
      }],
      uploadedBy: {
            type: String,
            required: true
      },
      createdAt: {
            type: Date,
            default: Date.now
      },
      address : {
            type: String,
            required: true
      },
      mobilenumber:{
            type: String,
            required:true,
      },
})
module.exports = model("OldProducts", UsedProductSchema)

