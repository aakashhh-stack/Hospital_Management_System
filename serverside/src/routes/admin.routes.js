import express from "express";
import{getAdminDashboard} from "../controllers/admin.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { isAuthorized } from "../middlewares/role.middleware.js";
const router = express.Router();

//------------------- Admin Dashboard route -------------------

router.get('/admin/dashboard',isAuth,isAuthorized('admin'),getAdminDashboard);

export default router;