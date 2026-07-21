
import {Job} from "../models/job.js";
// recruiter
export const postJob = async(req,res)=>{
    try{
        const {title,description,requirements,salary,location,jobType,position,companyId ,experience}=req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !position  || !companyId || !experience){
            return res.status(400).json({message: "Please provide all required fields",success:false});
        }
        const parsedRequirements = Array.isArray(requirements)
            ? requirements.map(r => String(r).trim())
            : (typeof requirements === "string" ? requirements.split(",").map(r => r.trim()) : []);

        const job = await Job.create({
            title,
            description,
            requirements: parsedRequirements,
            salary: Number(salary),
            location,
            jobType,
            position,
            company: companyId,
            experienceLevel: Number(experience),
            created_by: userId
        });
        return res.status(201).json({message: "Job posted successfully",success:true,job});
    }catch(error){
        console.error("Error in postJob:", error);
        return res.status(500).json({message: "Error posting job",success:false, error: error.message});
    }
}
// stu
export const getAllJobs = async(req,res)=>{
    try{

        // keyword search
        const keyword = req.query.keyword;
        const query = keyword ? {
            $or: [  
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { requirements: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
            ]
        } : {};
        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt: -1});
        if(!jobs || jobs.length === 0){
            return res.status(404).json({message: "No jobs found",success:false});
        }
        return res.status(200).json({message: "Jobs found",success:true,jobs});
    }catch(error){
        console.error("Error in getAllJobs:", error);
        return res.status(500).json({message: "Error getting jobs",success:false, error: error.message});
    }
}
// stu
export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: "Job not found",success:false});
        }
        return res.status(200).json({message: "Job found",success:true,job});
    }catch(error){
        return res.status(500).json({message: "Error getting job",success:false});
    }
}


// recruiter total jobs posted by him
export const getAdminJobs = async(req,res)=>{
    try{
        const adminId = req.id;

        const jobs = await Job.find({created_by: adminId});
        if(!jobs){
            return res.status(404).json({message: "No jobs found",success:false});
        }
        return res.status(200).json({message: "Jobs found",success:true,jobs});
    }catch(error){
        return res.status(500).json({message: "Error getting jobs",success:false});
    }
}
