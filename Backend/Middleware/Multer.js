const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "remarket",           // Cloudinary folder name
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "jfif"],
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|jfif|png|gif|webp/;
    const extname = filetypes.test(
      require("path").extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
}).array("files", 10);

module.exports = { upload };
