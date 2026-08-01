import fs from "fs";
import path from "path";
import {Company} from "../models/company.js";

export const registerCompany = async(req,res)=>{
    try{
        const {companyName} = req.body;
        if(!companyName ){
            return res.status(400).json({message: "Company name is required",success:false});
        }

        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({message: "Company already exists",success:false});
        };
        company = await Company.create({
            name: companyName,
            userId: req.id,
        });
      return  res.status(201).json({message: "Company registered successfully",success:true,company});
    }catch(error){
            res.status(500).json({message: "Error registering company",success:false});
        }
}

export const getCompany = async(req,res)=>{
    try{
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({message: "No companies found",success:false});
        }
        return  res.status(200).json({message: "Companies found",success:true,companies});
    }catch(error){
    return    res.status(500).json({message: "Error getting company",success:false});
    }
}

export const getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({message: "Company not found",success:false});
        }
     return   res.status(200).json({message: "Company found",success:true,company});
    }catch(error){
        return res.status(500).json({message: "Error getting company",success:false});
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, location, website, description, logo } = req.body;
        const updatedData = { name, location, website, description };

        if (logo && typeof logo === "string" && logo.startsWith("data:")) {
            const matches = logo.match(/^data:(image\/[a-zA-Z0-9+.]+);base64,(.+)$/);
            if (!matches) {
                return res.status(400).json({ message: "Invalid logo data", success: false });
            }

            const ext = matches[1].split("/")[1] || "png";
            const imageBuffer = Buffer.from(matches[2], "base64");
            const filename = `company-logo-${Date.now()}.${ext}`;
            const uploadDir = path.join(process.cwd(), "uploads", "company");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, filename);
            await fs.promises.writeFile(filePath, imageBuffer);
            updatedData.logo = `${req.protocol}://${req.get("host")}/uploads/company/${filename}`;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        }

        return res.status(200).json({ message: "Company updated successfully", success: true, company });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating company", success: false });
    }
};
