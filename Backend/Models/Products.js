const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: false,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,  // Cloudinary public_id — used to delete/update images
        required: false,
      },
    },
  ],
  uploadedBy: {
    type: String,
    default: "Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Product", ProductSchema);
