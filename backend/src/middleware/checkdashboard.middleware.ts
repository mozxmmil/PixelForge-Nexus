import { Request, Response, NextFunction } from "express";

export const checkDashboard = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.user?.role);
	if (req.user?.role == "ADMIN") {
		next();
	}
	return res
		.status(401)
		.json({ error: "only admin can create project", success: false });
};
