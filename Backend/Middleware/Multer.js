const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
      destination: (req,file,cb)=>{
            const uploadfolder = path.join(__dirname,"uploads")
            if(!fs.existsSync(uploadfolder)){
                  fs.mkdirSync(uploadfolder)
            }
            else{
                  cb(null,uploadfolder)
            }
      },
      filename: (req,file,cb)=>{
            cb(null,Date.now()+path.extname(file.originalname))
      }
})
const upload = multer({
     storage:storage,
     limits: {fileSize : 10*1024*1024},
     fileFilter:(req,file,cb)=>{
     const filetypes = /jpeg|jpg|png|gif/
     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
     const mimetype = filetypes.test(file.mimetype)
     if(extname && mimetype){
       return cb(null,true)
     }
     else{
       cb(new Error("Invalid type"))
     }

     }    
}).array('files', 10)
module.exports = {upload,storage}