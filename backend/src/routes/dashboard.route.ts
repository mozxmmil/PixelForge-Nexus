import express, { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import {
	createProject,
	dashboard,
	deleteProject,
	updateProject,
} from "../controllers/dashboard.controller.js";
import { checkDashboard } from "../middleware/checkdashboard.middleware.js";

const router: Router = express.Router();

router.get("/", checkAuth, dashboard);
router.post("/createproject", checkAuth, checkDashboard, createProject);
router.put("/updateproject/:id", checkAuth, checkDashboard, updateProject);
router.delete("/delete/:id", checkAuth, checkDashboard, deleteProject);

export default router;
