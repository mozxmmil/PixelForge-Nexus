import { z } from "zod";

export const signupZodSchema = z.object({
	name: z.string(),
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
	role: z.enum(["ADMIN", "PROJECT_LEAD", "DEVELOPER"]),
});
