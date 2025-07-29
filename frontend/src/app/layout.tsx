import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/common/themeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "PixelForge Nexus",
	description: "Build ideas into reallity",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Toaster />
				<body>{children}</body>
			</ThemeProvider>
		</html>
	);
}
