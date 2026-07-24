import express from "express";
import {register ,login,updateProfile,logout} from "../controllers/userController.js";
import {singleUpload} from "../middlewares/multer.js";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register",singleUpload, register);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",isAuthenticated,updateProfile);

export default router;