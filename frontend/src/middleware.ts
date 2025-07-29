import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const responce = NextResponse.next();

	if (url.pathname === "/") {
		console.log("object");
		return NextResponse.redirect(new URL("/signUp", req.url));
	}
	return responce;
}

export const config = {
	matcher: ["/"],
};
