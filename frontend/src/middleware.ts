import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const token = req.cookies.get("token");

	// If user has token, block /login and /signup
	if (token && (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// If user does not have token, block /, /dashboard, and any /dashboard/*
	if (!token && (url.pathname === "/" || url.pathname.startsWith("/dashboard"))) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

// ✅ Match only these routes for protection and redirection
export const config = {
	matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};
