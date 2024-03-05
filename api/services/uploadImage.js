import dotenv from "dotenv";

dotenv.config();
import {v2 as cloudinary} from 'cloudinary';
import jwt from "jsonwebtoken";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//`/upload?type=${type}`
export const uploadCloud = async (req, res) => {
  //check jwt
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Please login first");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // set filename = public_id
    const {type} = req.query;
    let filename = req.file.originalname;
    switch (type) {
      case "cover":
        filename = `${userInfo.id}_coverPic`
        break;
      case "profile":
        filename = `${userInfo.id}_profilePic`
        break;
      case "post":
        filename = `${userInfo.id}_postImage_${Date.now()}`
        break;
      default:
        res.status(403).json("Image type is not valid");
    }
    // turn file => base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    //upload

    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
      overwrite: true,
      public_id: filename
    };
    cloudinary.uploader.upload(dataURI, options)
      .then(data=> res.status(200).json(data.url))
      .catch(err => res.status(500).json(err))
  })

}
