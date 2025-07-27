import { User } from "./src/types/user.global.ts";

declare global {
	namespace Express {
		interface Request {
			user?: User; // or 'any' if you don't have a User type
		}
	}
}

export default {};
