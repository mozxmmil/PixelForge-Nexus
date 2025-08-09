import express, { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import {
	createProject,
	dashboard,
	deleteProject,
	getCurrentUser,
	headerData,
	headerSubData,
	updateProject,
} from "../controllers/dashboard.controller.js";
import { checkDashboard } from "../middleware/checkdashboard.middleware.js";

const router: Router = express.Router();

router.get("/getCurrentUser", checkAuth, getCurrentUser);
router.get("/", checkAuth, dashboard);
router.post("/createproject", checkAuth, checkDashboard, createProject);
router.put("/updateproject/:id", checkAuth, checkDashboard, updateProject);
router.delete("/delete/:id", checkAuth, checkDashboard, deleteProject);
router.get("/headerdata", checkAuth, headerData);
router.get("/headerSubData", checkAuth, headerSubData);

export default router;
