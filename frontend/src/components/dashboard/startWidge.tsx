import { LucideIcon } from "lucide-react";

interface StatWidgetProps {
	icon: LucideIcon;
	label: string;
	value: string | number;
	change?: string;
	changePositive?: boolean;
}
export default function StatWidget({
	icon: Icon,
	label,
	value,
	change,
	changePositive,
}: StatWidgetProps) {
	return (
		<div className="flex items-center bg-white rounded-xl shadow p-4 gap-4 dark:bg-neutral-900">
			<div className="bg-blue-100 rounded-full p-2">
				<Icon className="text-blue-600" size={26} />
			</div>
			<div>
				<div className="text-xs text-gray-500">{label}</div>
				<div className="font-bold text-lg">{value}</div>
				{change && (
					<div
						className={`text-xs ${
							changePositive ? "text-green-500" : "text-red-500"
						}`}
					>
						{change}
					</div>
				)}
			</div>
		</div>
	);
}
