import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: "Category-images",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
        }
    },
})


const parser = multer({ storage: storage })

export default parser;
