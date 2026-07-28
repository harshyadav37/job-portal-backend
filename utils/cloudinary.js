// https://console.cloudinary.com/app/c-e37583158cfccff3e1d3d8c2749ca5/settings/api-keys
// https://console.cloudinary.com/app/c-e37583158cfccff3e1d3d8c2749ca5/home/dashboard

import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});
export default cloudinary