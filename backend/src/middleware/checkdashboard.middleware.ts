import { Request, Response, NextFunction } from "express";

export const checkDashboard = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user?.role === "ADMIN") {
		return next();
	}
	return res
		.status(401)
		.json({ error: "only admin can create project", success: false });
};
