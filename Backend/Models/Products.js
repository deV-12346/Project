const {Schema ,model} = require("mongoose")
const ProductSchema  = new Schema({
      productName :{
            type:String,
            required:true
      },
      productDescription :{
            type:String,
            required:true
      },
      category : {
            type:String,
            required:true
      },
      productPrice :{
            type:Number,
            required:true
      },
      offerPrice :{
            type:Number,
            required:false
      },
      images:[{
            url : {
                  type:String,
                  required:true
            }
      }],
      uploadedBy :{
            type:String,
            default:"Admin"
      },
      createdAt : {
            type:Date,
            default:Date.now
      }
})
module.exports = model("Products",ProductSchema)