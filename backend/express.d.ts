import { Users } from "@prisma/client";

declare global {
	namespace Express {
		interface Request {
			user?: Users; // or 'any' if you don't have a User type
		}
	}
}

export default {};
