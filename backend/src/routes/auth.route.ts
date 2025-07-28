import express, { Router } from "express";
import { login, logout, singup } from "../controllers/auth.controller.js";

const router: Router = express.Router();

router.post("/signup", singup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
