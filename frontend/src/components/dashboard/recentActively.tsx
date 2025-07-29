import { Activity, CheckCircle, User, FileText } from "lucide-react";

const activities = [
	{
		icon: User,
		name: "Alice Johnson",
		desc: "Completed homepage design mockups",
		time: "2 hours ago",
	},
	{
		icon: FileText,
		name: "Bob Smith",
		desc: "Added feedback on mobile wireframes",
		time: "5 hours ago",
	},
	{
		icon: Activity,
		name: "Carol Wilson",
		desc: "Joined the development team",
		time: "1 day ago",
	},
	{
		icon: CheckCircle,
		name: "David Brown",
		desc: "Finished security audit",
		time: "3 days ago",
	},
];

export default function RecentActivity() {
	return (
		<div className="bg-white rounded-lg shadow p-5 w-full dark:bg-neutral-900">
			<h3 className="font-semibold mb-3">Recent Activity</h3>
			<div className="flex flex-col gap-3">
				{activities.map((a, i) => (
					<div className="flex items-start gap-3" key={i}>
						<a.icon className="w-5 h-5 text-blue-500 mt-1" />
						<div>
							<span className="font-medium">{a.name}</span>{" "}
							<span className="text-gray-600">{a.desc}</span>
							<div className="text-xs text-gray-400">{a.time}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
