"use client";
import ActiveProjectCard from "@/components/dashboard/activeProjectcard";
import CreateProjectDashboard from "@/components/dashboard/createProject.dashboard";
import RecentActivity from "@/components/dashboard/recentActively";
import StatWidget from "@/components/dashboard/startWidge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProject } from "@/hook/dashbord.hook";
import { useApplicationData } from "@/zustand/applicationData.zustand";

import {
	CheckCircle2,
	ClipboardList,
	FileWarning,
	LayoutDashboard,
	Users,
} from "lucide-react";

export default function Dashboard() {
	const { isOpen } = useApplicationData((state) => state);
	const { data, loading } = useGetAllProject();

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-neutral-800 overflow-hidden relative">
			<div className="md:ml-55 flex flex-col">
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pt-6 ">
					<StatWidget
						icon={LayoutDashboard}
						label="Total Projects"
						value={12}
						change="+2 from last month"
						changePositive
					/>
					<StatWidget
						icon={ClipboardList}
						label="Active Tasks"
						value={48}
						change="+12% from last week"
						changePositive
					/>
					<StatWidget
						icon={Users}
						label="Team Members"
						value={24}
						change="+3 new members"
						changePositive
					/>
					<StatWidget
						icon={CheckCircle2}
						label="Completion Rate"
						value="87%"
						change="+5% from last month"
						changePositive
					/>
				</section>
				<section className="flex flex-col lg:flex-row gap-3 p-2 xl:p-6  w-full  justify-between  ">
					<div className=" flex-1 ">
						<h3 className="font-semibold mb-3">Active Projects</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative    ">
							{loading ? (
								Array.from({ length: 4 }).map((_, inx) => (
									<Skeleton
										key={inx}
										className="h-[200px] w-full  rounded-xl bg-white dark:bg-neutral-900 min-w-[268px]"
									/>
								))
							) : Array.isArray(data?.data) && data.data.length > 0 ? (
								data.data.map((value) => (
									<ActiveProjectCard
										key={value.id}
										title={value.name}
										desc={value.description}
										progress={75} //todo: i have to build api for this
										deadline={value.deadline}
										members={value.clientInfo}
										tasks={18}
										totalTasks={24}
										active={value.status}
									/>
								))
							) : (
								<div className="  text-center flex items-center justify-center  h-full w-full ">
									<div className="flex items-center  p-40 w-full justify-center">
										<div className="flex gap-3 items-center">
											<h1 className="text-2xl font-bold text-white text-nowrap">
												No Project 
											</h1>
											<FileWarning />
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					{/* Recent Activity */}
					<div className="md:max-w-68 ">
						<RecentActivity />
					</div>
				</section>
			</div>
			{isOpen && <CreateProjectDashboard />}
		</div>
	);
}
