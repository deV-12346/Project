const UsedProduct = require("../../Models/UsedProduct");
const { UsedProductValidation } = require("../../Services/Validatiion_schema");
const { upload } = require("../../Middleware/Multer");
const Seller = require("../../Models/seller.model");

const OldProduct = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload file",
      });
    }

    try {
      const { id, productName, productDescription, price, category, address } =
        await UsedProductValidation.validateAsync(req.body);

      // multer-storage-cloudinary puts Cloudinary data on file.path (secure URL)
      // and file.filename (public_id)
      const imgurl = req.files.map((file) => ({
        url: file.path,           // Cloudinary secure URL
        public_id: file.filename, // Cloudinary public_id
      }));

      const seller = await Seller.findById(id);
      if (!seller) {
        return res.status(400).json({
          success: false,
          message: "Seller not Found",
        });
      }

      const sname = seller.sellername;
      const phone = seller.mobileno;

      const NewProduct = new UsedProduct({
        id,
        images: imgurl,
        productName,
        productDescription,
        price,
        status: "Pending",
        category,
        address,
        uploadedBy: sname,
        mobilenumber: phone,
      });

      await NewProduct.save();
      return res.status(200).json({
        success: true,
        message: "Product added successfully",
        data: NewProduct,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { OldProduct };
