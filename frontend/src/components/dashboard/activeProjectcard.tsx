import { cn } from "@/lib/utils";
import { ClientInfo, Status } from "@/types/zod/projectData.type.zod";
import { Users, Calendar } from "lucide-react";

interface ProjectCardProps {
	title: string;
	desc: string;
	progress: number;
	deadline: string;
	members: ClientInfo;
	tasks: number;
	totalTasks: number;
	active: Status;
}
export default function ActiveProjectCard({
	title,
	desc,
	progress,
	deadline,
	members,
	tasks,
	totalTasks,
	active,
}: ProjectCardProps) {
	const date = new Date(deadline).toLocaleDateString();
	
	return (
		<div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 min-w-[268px] dark:bg-neutral-900 hover:cursor-pointer hover:bg-neutral-100 dark:hover:outline outline-gray-600 hover:scale-101 transition-all duration-300">
			<div className="flex justify-between items-center">
				<span className="font-semibold">{title}</span>
				<span
					className={cn(
						"bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded",
						active == Status.ACTIVE && "text-green-100 bg-green-600",
						active == Status.PLANNED && "text-blue-100 bg-blue-600",
						active == Status.COMPLETED && "text-green-100 bg-green-600",
						active == Status.ON_HOLD && "text-yellow-100 bg-yellow-600",
						active == Status.CANCELLED && "text-red-100 bg-red-600"
					)}
				>
					{active}
				</span>
			</div>
			<div className="text-gray-500 text-xs mb-2">{desc}</div>
			<div className="mb-3">
				<div className="flex justify-between text-xs">
					<span className="font-medium">Progress</span>
					<span>{progress}%</span>
				</div>
				<div className="w-full h-2 bg-gray-200 rounded">
					<div
						className="bg-blue-500 h-2 rounded"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>
			<div className="flex items-center text-xs text-gray-500 gap-2 mb-2">
				<Calendar size={14} /> {date}
				<Users size={14} className="ml-4" />{" "}
				<span className="ml-1 font-bold">{members.name}</span>
			</div>
			<div className="text-xs text-gray-400">
				{tasks}/{totalTasks} tasks
			</div>
		</div>
	);
}
