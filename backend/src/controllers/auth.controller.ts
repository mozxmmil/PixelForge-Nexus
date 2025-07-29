import { Request, Response } from "express";
import { signupZodSchema } from "../zod/auth.zod.js";
import { prismaClient } from "../lib/connectDb.js";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";
import { jsonwebtoken } from "../lib/jsonwebtoken.lib.js";
import { errorHandler } from "../lib/error.handler.lib.js";

export const singup = async (req: Request, res: Response) => {
	const { email, password, role, name } = req.body;

	if (!email) return res.status(400).json({ error: "Email is required" });
	if (!password)
		return res.status(400).json({ error: "Password is required" });
	if (!role) return res.status(400).json({ error: "Role is required" });
	if (!name) return res.status(400).json({ error: "Name is required" });

	try {
		const validData = signupZodSchema.safeParse({
			email,
			password,
			role,
			name,
		});
		if (!validData.success) {
			return res
				.status(400)
				.json({ error: validData.error.issues.map((err) => err.message) });
		}

		const existingUser = await prismaClient.users.findUnique({
			where: { email },
		});

		if (existingUser)
			return res.status(400).json({ error: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prismaClient.users.create({
			data: {
				email: email,
				passwordHash: hashedPassword,
				role: role as UserRole,
				name: name,
			},
		});

		jsonwebtoken.generateToken(user.id, res);
		return res
			.status(201)
			.json({ message: "signup successful", success: true });
	} catch (error) {
		console.error(error);
		errorHandler(error as string | Error, res);
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email) return res.status(400).json({ error: "Email is required" });
	if (!password)
		return res.status(400).json({ error: "Password is required" });

	try {
		const user = await prismaClient.users.findUnique({
			where: { email },
		});

		if (!user) return res.status(400).json({ error: "User not found" });

		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

		if (!isPasswordValid)
			return res.status(400).json({ error: "Invalid password" });

		jsonwebtoken.generateToken(user.id, res);
		return res
			.status(200)
			.json({ message: "Login successful", success: true });
	} catch (error) {
		console.error(error);
		errorHandler(error as string | Error, res);
	}
};

export const logout = async (req: Request, res: Response) => {
	res.clearCookie("token");
	return res.status(200).json({ message: "Logout successful" });
};
