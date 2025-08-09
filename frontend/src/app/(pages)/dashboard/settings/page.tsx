"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LucideSettings, LucideUser } from "lucide-react";
import { useTheme } from "next-themes";
import { useUserStore } from "@/zustand/userData.zustand";
export default function SettingsPage() {
	const { theme, setTheme } = useTheme();

	const user = useUserStore((state) => state.user);

	return (
		<div className="h-screen overflow-hidden md:ml-55 bg-gray-100 dark:bg-neutral-900 transition-colors duration-300">
			<div className="p-10 h-full">
				<div className="bg-white dark:bg-neutral-800 shadow-xl border border-gray-200 dark:border-neutral-700 h-full p-10 rounded-2xl transition-colors duration-300">
					<div className="upperSection flex items-center justify-between mb-8">
						<div className="space-y-3">
							<h1 className="font-bold text-3xl flex gap-2 items-center text-black dark:text-white">
								<LucideSettings />
								Admin Settings
							</h1>
						</div>
						<Button className="bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center shadow-md">
							<LucideUser />
							Edit Profile
						</Button>
					</div>
					<div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-6 mt-10 rounded-xl shadow-lg space-y-6 transition-colors duration-300">
						<div className="flex gap-4 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm items-center">
							<Avatar>
								<AvatarImage src={user?.profileImage} />
								<AvatarFallback>SC</AvatarFallback>
							</Avatar>
							<div className="flex flex-col justify-center">
								<h1 className="font-bold text-xl text-gray-900 dark:text-white">
									{user?.name}
								</h1>
								<p className="text-gray-500 dark:text-gray-400 text-sm">
									{user?.email}
								</p>
							</div>
						</div>
						<div className="flex gap-4 justify-between items-center bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
							<h1 className="font-bold text-xl text-gray-900 dark:text-white">
								Theme
							</h1>
							<Select value={theme} onValueChange={setTheme}>
								<SelectTrigger className="w-[120px] bg-zinc-200 dark:bg-zinc-700 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-600 shadow-none focus:ring-2 focus:ring-blue-400">
									<SelectValue placeholder="Select theme" />
								</SelectTrigger>
								<SelectContent className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="light">Light</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
