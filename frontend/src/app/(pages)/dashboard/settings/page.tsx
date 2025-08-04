import { Button } from "@/components/ui/button";
import { LucideUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function SettingsPage() {
	return (
		<div className=" h-screen  overflow-hidden md:ml-55 ">
			<div className="p-10 bg-gray-50 dark:bg-neutral-800 h-full">
				<div className="bg-gray-900 h-full p-10">
					<div className="upperSection flex items-center  justify-between">
						<div className="space-y-3">
							<h1 className="font-bold text-2xl text-black dark:text-white ">
								Profile Setting
							</h1>
							<h4>Manage your personal information and preferences</h4>
						</div>
						<Button className="bg-blue-500 flex justify-center items-center ">
							<LucideUser />
							Edit Profile
						</Button>
					</div>
					<div className="bg-zinc-900 h-full">
						<div>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>SC</AvatarFallback>
							</Avatar>
							<div>
								<h1 className="font-bold text-2xl text-black dark:text-white ">
									Name
								</h1>
								<p className="text-gray-500 dark:text-gray-400">
									mozammel@gmail.com
								</p>
                                
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
