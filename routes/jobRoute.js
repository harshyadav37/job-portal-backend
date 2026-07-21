import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob,getAllJobs,getJobById , getAdminJobs} from "../controllers/jobController.js";


const router = express.Router();

router.post("/post",isAuthenticated,postJob);
router.get("/get",  isAuthenticated,getAllJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.get("/admin/jobs",isAuthenticated,getAdminJobs);


export default router;