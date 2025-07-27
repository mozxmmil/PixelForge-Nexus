import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { Response } from "express";
export class jsonwebtoken {
	public static generateToken(payload: string, res: Response) {
		const options: SignOptions = {
			expiresIn: "7d",
		};
		try {
			const token = jwt.sign({ payload }, process.env.JWT_SECRET!, options);
			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 15 * 60 * 60 * 1000,
			});
		} catch (error) {
			console.error(error);
			throw new Error(error as string);
		}
	}
	public static verifyToken(token: string): JwtPayload | undefined {
		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as JwtPayload;
			return decoded;
		} catch (error) {
			console.error(error);
			throw new Error(error as string);
		}
	}
}
