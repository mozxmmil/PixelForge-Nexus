import z from "zod";

export const createProjectSchema = z.object({
	name: z.string(),
	description: z.string(),
	deadline: z.string(),
	status: z.enum(["PLANNED", "ACTIVE", "COMPLETED", "ON_HOLD", "CANCELLED"]),
	clientname: z.string(),
	clientphone: z
		.string()
		.max(10, { message: "Phone number must be at least 10 characters long" })
		.min(10, { message: "Phone number must be at least 10 characters long" }),
});
