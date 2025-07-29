"use client";
import { useApplicationData } from "@/zustand/applicationData.zustand";
import { Home, ListChecks, Settings, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function DashboardSidebar() {
	const { isOpen, setIsOpen } = useApplicationData((state) => state);
	
	return (
		<aside className=" h-full bg-white border-r md:w-55  p-4 fixed top-0 left-0 z-40 hidden md:block dark:bg-neutral-900 ">
			<div className="flex items-center justify-between">
				<span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
					PixelForge Nexus
				</span>
			</div>
			<nav className="mt-8 flex-1 ">
				<Button
					onClick={() => setIsOpen(!isOpen)}
					className="w-full mt-5 mb-5 hover:cursor-pointer "
				>
					New Project
				</Button>
				<ul className="space-y-2 ">
					{navItems.map((item) => (
						<li key={item.name}>
							<Link
								href={item.href}
								className="flex items-center p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition"
							>
								<item.icon className="w-5 h-5 text-blue-500 mr-3" />
								<span className="font-medium">{item.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}

const navItems = [
	{ name: "Dashboard", icon: Home, href: "/dashboard" },
	{ name: "Projects", icon: ListChecks, href: "/dashboard/projects" },
	{ name: "Tasks", icon: ListChecks, href: "/dashboard/tasks" },
	{ name: "Team", icon: Users, href: "/dashboard/team" },
	{ name: "Settings", icon: Settings, href: "/dashboard/settings" },
];
