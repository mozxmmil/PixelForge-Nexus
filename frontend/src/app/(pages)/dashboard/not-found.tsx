// app/not-found.tsx
"use client";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center md:ml-64 overflow-hidden h-screen">
			<p className="text-2xl mb-6 font-bold">Page Not Found</p>
			<Link href="/dashboard" className="text-blue-600 underline">
				Go to Home
			</Link>
		</div>
	);
}
