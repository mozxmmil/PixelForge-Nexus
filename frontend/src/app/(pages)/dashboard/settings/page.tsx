"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/zustand/userData.zustand";
import { LucideSettings, Palette, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

type SectionType = "profile" | "theme";

interface Section {
	id: "profile" | "theme";
	title: string;
	icon: React.ReactNode;
}

const sections: Section[] = [
	{
		id: "profile",
		title: "Profile",
		icon: <User />,
	},
	{
		id: "theme",
		title: "Theme",
		icon: <Palette />,
	},
];

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();

	const [isActive, setIsActive] = useState<SectionType>("profile");

	const user = useUserStore((state) => state.user);

	const sectionShow = () => {
		switch (isActive) {
			case "profile":
				return <div>Profile Section</div>;
			case "theme":
				return <div>Theme Section</div>;
			default:
				return <div>Default Section</div>;
		}
	};

	return (
		<div className="h-screen overflow-hidden md:ml-55 bg-gray-100 dark:bg-neutral-900 transition-colors duration-300">
			<div className="p-10 h-full ">
				<div className="bg-white  dark:bg-neutral-800 shadow-xl border border-gray-200 dark:border-neutral-700 h-full p-10 rounded-2xl transition-colors duration-300 ">
					<div className="upperSection flex items-center justify-between mb-8">
						<div className="space-y-3">
							<h1 className="font-bold text-3xl flex gap-2 items-center text-black dark:text-white">
								<LucideSettings />
								Admin Settings
							</h1>
						</div>
					</div>
					<div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-zinc-700 p-6 mt-10 rounded-xl shadow-lg space-y-6 transition-colors duration-300">
						{sections.map((section) => (
							<button
								onClick={() => setIsActive(section.id)}
								key={section.id}
								className={cn(
									"flex w-full space-x-3 text-left bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm items-center hover:cursor-pointer transition-all duration-100 font-medium",
									section.id == isActive &&
										"bg-blue-300 dark:bg-gray-800 outline outline-blue-500 "
								)}
							>
								{section.icon}
								<span className=" text-gray-900 dark:text-white">
									{section.title}
								</span>
							</button>
						))}
					</div>
					<div className="dynaimcSection  min-h-50 rounded-2xl p-10 ">
						<div className="flex items-center justify-between ">
							<span className="text-xl font-medium text-gray-900 dark:text-white">
								{sections.find((item) => item.id === isActive)?.title}
							</span>
						</div>

						<div className="dynamicContent bg-red-500">
							{sectionShow()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
