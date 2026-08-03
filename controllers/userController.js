import {User} from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register =async(req,res)=>{
    try{
     const {fullName,email, phoneNumber,password,role}=req.body;  
     if(!fullName || !email || !phoneNumber || !password || !role){
        return res.status(400).json({message: "Please provide all required fields",success:false});
     } 
     const file = req.file;
     const fileUri =getDataUri(file);
     const cloudResopne= await cloudinary.uploader.upload(fileUri.content)

     const user =await User.findOne({email});
     if(user){
        return res.status(400).json({message: "User already exists",success:false});
     }

  const hashedPassword = await bcrypt.hash(password,10);

  const profilePhoto = req.file ? req.file.buffer.toString('base64') : "";

  const newUser = await User.create({
    fullName,
    email,  
    phoneNumber,
    password: hashedPassword,
    role,
    profile: {
      profilePhoto:cloudResopne.secure_url ,
      skills: []
    }
  });

  res.status(201).json({message: "User registered successfully",success:true, user: newUser});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error registering user",success:false});
    }
}


export const login = async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({message: "Please provide all required fields",success:false});
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist",success:false});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password",success:false});
        };
        // check if the role matches
        if(user.role !== role){
            return res.status(400).json({message: "Invalid role",success:false});
        }
        const tokenData={
            userId: user._id,
            role: user.role,
        };
        const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: "7d"});
        user={
         _id: user._id,
         fullName: user.fullName,
         email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,   
        }
         return res.status(200).cookie("token",token,{ maxAge: 7*24*60*60*1000,httpOnly:true,sameSite:'none',secure: process.env.NODE_ENV === 'production' }).json({message: `Welcome back, ${user.fullName}!`,success:true,user});
        
    }catch(error){
     return   res.status(500).json({message: "Error logging in",success:false});
    }

}




export const logout = async(req,res)=>{
    try{
    return res.status(200).cookie("token","",{maxAge:0}).json({message: "Logged out successfully",success:true});   
    }catch(error){
        res.status(500).json({message: "Error logging out",success:false});
    }  
 }




 export const updateProfile = async(req,res)=>{
    try{
        const {fullName,email,phoneNumber,bio,skills}=req.body;
        const file = req.file;

        let cloudResponse = null;
        if(file?.buffer){
            const fileUri = getDataUri(file);
            if(fileUri){
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }
        }

let skillsArray;
     if(skills !== undefined){
       skillsArray = skills ? skills.split(",").map((item)=>item.trim()).filter(Boolean) : [];
     }

     
     const userId = req.id;  
     let user = await User.findById(userId);
     if(!user){
        return res.status(400).json({message: "User does not exist",success:false});
     }

    //  updating data


    if(fullName !== undefined) user.fullName = fullName;
    if(email !== undefined) user.email = email;
    if(phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if(bio !== undefined) user.profile.bio = bio;
    if(skillsArray !== undefined) user.profile.skills = skillsArray;

    //  resume

    if(cloudResponse && file){
        user.profile.resume= cloudResponse.secure_url
        user.profile.resumeOriginalName=file.originalname
    }
     await user.save();


       user={
         _id: user._id,
         fullName: user.fullName,
         email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,   
        }

        
    return res.status(200).json({message: "Profile updated successfully",success:true,user});
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message || "Error updating profile",success:false});
    }


}