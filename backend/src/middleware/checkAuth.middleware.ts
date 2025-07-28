import { NextFunction, Request, Response } from "express";
import { jsonwebtoken } from "../lib/jsonwebtoken.lib.js";
import { prismaClient } from "../lib/connectDb.js";
export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	try {
		const decoded = jsonwebtoken.verifyToken(token);
		if (!decoded.payload) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		
		const user = await prismaClient.users.findUnique({
			where: { id: decoded.payload },
		});

		if (!user) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
