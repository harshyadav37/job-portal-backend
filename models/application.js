import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    // realtion between application and job
 job:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
 },
 applicant:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
 },
    status:{
        type: String,
        enum: ["applied", "shortlisted", "rejected", "accepted"],
        default: "applied",
        required: true,
    }
},{timestamps: true});
export const Application = mongoose.model("Application", applicationSchema);