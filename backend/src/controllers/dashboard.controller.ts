import { Request, Response } from "express";
import { prismaClient } from "../lib/connectDb.js";
import { errorHandler } from "../lib/error.handler.lib.js";
import { createProjectSchema } from "../zod/dashboard.zod.js";

export const dashboard = async (req: Request, res: Response) => {
	const user = req.user;
	try {
		if (user?.role === "ADMIN") {
			const getProjects = await prismaClient.projects.findMany({
				include: {
					clientInfo: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			if (!getProjects || getProjects.length === 0)
				return res.status(200).json({
					message: "project not found",
					success: false,
				});

			return res.status(200).json({
				message: "all projecta",
				success: true,
				data: getProjects,
			});
		} else if (user?.role === "PROJECT_LEAD") {
			const getProjects = await prismaClient.projects.findMany({
				where: {
					createdBy: user.id,
				},
				include: {
					clientInfo: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			if (!getProjects || getProjects.length === 0)
				return res.status(200).json({
					message: "project not found",
					success: false,
				});
			return res.status(200).json({
				message: "project lead project found",
				success: true,
				data: getProjects,
			});
		} else {
			const getProjects = await prismaClient.projects.findMany({
				where: {
					assignments: {
						some: {
							userId: user?.id,
						},
					},
				},
			});

			if (!getProjects || getProjects.length === 0)
				return res.status(200).json({
					message: "project not found",
					success: false,
				});
			return res.status(200).json({
				message: "developer project found",
				success: true,
				data: getProjects,
			});
		}
	} catch (error) {
		console.error(error);
		return errorHandler(error as Error | string, res);
	}
};

export const createProject = async (req: Request, res: Response) => {
	const user = req.user;
	const { name, description, deadline, status, clientname, clientphone } =
		req.body;
	try {
		const validData = createProjectSchema.safeParse({
			name,
			description,
			deadline,
			status,
			clientname,
			clientphone,
		});
		if (!validData.success) {
			return res.status(406).json({
				success: false,
				error: validData.error.issues.map((err) => err.message),
			});
		}
		const client = await prismaClient.clientdata.create({
			data: {
				name: clientname,
				phone: clientphone,
			},
		});
		const createdProject = await prismaClient.projects.create({
			data: {
				name,
				description,
				deadline,
				status,
				createdBy: user?.id as string,
				clinetId: client.id,
			},
			include: {
				clientInfo: true,
			},
		});

		return res.status(201).json({
			success: true,
			message: "project created successfully",
			data: createdProject,
		});
	} catch (error) {
		console.error(error);
		return errorHandler(error as Error | string, res);
	}
};

export const updateProject = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description, deadline, status } = req.body;
	try {
		const updatedProject = await prismaClient.projects.update({
			where: {
				id: id as string,
			},
			data: {
				name,
				description,
				deadline,
				status,
			},
		});
		return res.status(200).json({
			success: true,
			message: "project updated successfully",
			data: updatedProject,
		});
	} catch (error) {
		console.error(error);
		return errorHandler(error as Error | string, res);
	}
};

export const deleteProject = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return res.status(400).json({ error: "project id is required" });
	try {
		const deletedProject = await prismaClient.projects.delete({
			where: {
				id,
			},
		});
		console.log(deleteProject);
		return res.status(200).json({
			success: true,
			message: "project deleted successfully",
			data: deletedProject,
		});
	} catch (error) {
		console.error(error);
		errorHandler(error as Error | string, res);
	}
};

export const headerData = async (req: Request, res: Response) => {
	const [totalProject, activeTask, completedTask, teamMember] =
		await Promise.all([
			prismaClient.projects.count(),

			prismaClient.projects.count({
				where: {
					status: {
						in: ["ACTIVE", "PLANNED"],
					},
				},
			}),
			prismaClient.projects.count({
				where: {
					status: "COMPLETED",
				},
			}),
			prismaClient.users.count(),
		]);

	return res.status(200).json({
		success: true,
		message: "all header data",
		data: {
			totalProject,
			activeTask,
			completedTask,
			teamMember,
		},
	});
};

export const headerSubData = async (req: Request, res: Response) => {
	const currentDate = new Date();
	const lastDate = new Date(currentDate);
	lastDate.setMonth(currentDate.getMonth() - 1);
	const [totalProject, activeTask, totalMember, completedProject] =
		await Promise.all([
			prismaClient.projects.count({
				where: {
					createdAt: {
						gte: lastDate,
						lte: currentDate,
					},
				},
			}),
			prismaClient.projects.count({
				where: {
					AND: [
						{
							status: "ACTIVE",
						},
						{
							createdAt: {
								gte: lastDate,
								lte: currentDate,
							},
						},
					],
				},
			}),
			prismaClient.users.count({
				where: {
					AND: [
						{
							role: "DEVELOPER",
						},
						{
							createdAt: {
								gte: lastDate,
								lte: currentDate,
							},
						},
					],
				},
			}),
			prismaClient.projects.count({
				where: {
					AND: [
						{
							status: "COMPLETED",
						},
						{
							createdAt: {
								gte: lastDate,
								lte: currentDate,
							},
						},
					],
				},
			}),
		]);

	return res.status(200).json({
		success: true,
		message: "all header sub data",
		data: {
			totalProject,
			activeTask,
			totalMember,
			completedProject,
		},
	});
};

export const getCurrentUser = async (req: Request, res: Response) => {
	const user = req.user;
	return res.status(200).json({
		success: true,
		message: "current user",
		data: user,
	});
};
