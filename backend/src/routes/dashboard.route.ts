import express, { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import {
	createProject,
	dashboard,
} from "../controllers/dashboard.controller.js";
import { checkDashboard } from "../middleware/checkdashboard.middleware.js";

const router: Router = express.Router();

router.get("/", checkAuth, dashboard);
router.post("/createproject", checkAuth, checkDashboard, createProject);

export default router;
