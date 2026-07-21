import {Application} from "../models/application.js";
import {Job} from "../models/job.js";
export const applyJob = async(req,res)=>{
 try{
    const userId = req.id;
  
    const jobId = req.params.id;
    if(!jobId){
        return res.status(400).json({message: "Job ID is required",success:false});
    }
    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({job: jobId, applicant: userId});
    if(existingApplication){
        return res.status(400).json({message: "You have already applied for this job",success:false});
    }
  const job = await Job.findById(jobId);
  if(!job){
    return res.status(404).json({message: "Job not found",success:false});
  }
//   create new application
const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
})
job.applications.push(newApplication._id);
await job.save();
return res.status(201).json({message: "Job applied successfully",success:true,application:newApplication});
 }catch(error){
    console.error("Error in applyJob:", error);
    return res.status(500).json({message: "Error applying for job",success:false, error: error.message});
 }
}


export const getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const application = await Application.find({applicant: userId}).populate({path:"job",options:{sort:{createdAt: -1}},populate:{path:"company",options:{sort:{createdAt: -1}}}});
        if(!application || application.length === 0){
            return res.status(404).json({message: "No applications found",success:false});
        }
        return res.status(200).json({message: "Applications found",success:true,applications: application});
    }catch(error){
        console.error("Error in getAppliedJobs:", error);
        return res.status(500).json({message: "Error getting applications",success:false, error: error.message});
    }
}



export const getApplicants = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({path:"applications", options:{sort:{createdAt: -1}},populate:{path:"applicant"}});
        if(!job){
            return res.status(404).json({message: "Job not found",success:false});
        }
        return res.status(200).json({message: "Applicants found",success:true,applicants: job.applications ,job});
    }catch(error){
        console.error("Error in getApplicants:", error);
        return res.status(500).json({message: "Error getting applicants",success:false, error: error.message});
    }
}



export const updateStatus =async(req,res)=>{
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({message: "Status is required",success:false});
        }
        const application = await Application.findOne({ _id: applicationId });
        if(!application){
            return res.status(404).json({message: "Application not found",success:false});
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({message: "Status updated successfully",success:true,application});
    }catch(error){
        console.error("Error in updateStatus:", error);
        return res.status(500).json({message: "Error updating status",success:false, error: error.message});
    }
}