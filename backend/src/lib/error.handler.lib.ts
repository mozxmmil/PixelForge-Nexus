import { Response } from "express";

export const errorHandler = (error: Error | string, res: Response) => {
	let errorMessage = "Something went wrong";
	if (error instanceof Error) errorMessage = error.message;
	else if (typeof error === "string") errorMessage = error;

	return res.status(500).json({
		message: "Something went wrong",
		error: errorMessage,
	});
};
