import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECREET 
});
const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath)return null;
        
        const responce = await cloudinary.uploader.upload(localFilePath,{
            folder:"portfolio",
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath)
        return responce;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadOnCloudinary }