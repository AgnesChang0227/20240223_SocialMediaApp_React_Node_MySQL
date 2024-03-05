import multer from "multer";

export const uploadMulter = multer({
  limits: {
    fileSize: 4*1024*1024, //4MB
  },
  fileFilter: (req, file, cb) =>{
    const mimetype = file.mimetype;
    if (
      !(mimetype === "image/png" ||
      mimetype === "image/jpg" ||
      mimetype === "image/jpeg")
    ) {
      const error = new Error('Wrong file type for image')
      error.statusCode = 400;
      error.isOperational = true;
      return cb(error); //回傳錯誤
    }
    cb(null, true); //回傳 pass
  },
});
