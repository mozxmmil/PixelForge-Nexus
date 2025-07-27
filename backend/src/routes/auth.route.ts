import express, { Router } from "express";
import { login, singup } from "../controllers/auth.controller.js";

const router: Router = express.Router();

router.post("/signup", singup);
router.post("/login", login);

export default router;
