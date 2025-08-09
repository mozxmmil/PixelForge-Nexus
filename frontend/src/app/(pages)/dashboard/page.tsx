"use client";
import ActiveProjectCard from "@/components/dashboard/activeProjectcard";
import HeaderMetaData from "@/components/dashboard/headerMetaData";
import RecentActivity from "@/components/dashboard/recentActively";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProject, useGetCurrentUser } from "@/hook/dashbord.hook";

import { FileWarning } from "lucide-react";

export default function Dashboard() {
	const { data, isLoading } = useGetAllProject();
	 useGetCurrentUser();

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-neutral-800 overflow-hidden relative">
			<div className="md:ml-55 flex flex-col">
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pt-6 ">
					<HeaderMetaData />
				</section>
				<section className="flex flex-col lg:flex-row gap-3 p-2 xl:p-6  w-full  justify-between  ">
					<div className=" flex-1 ">
						<h3 className="font-semibold mb-3">Active Projects</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative    ">
							{isLoading ? (
								Array.from({ length: 4 }).map((_, inx) => (
									<Skeleton
										key={inx}
										className="h-[200px] w-full  rounded-xl bg-white dark:bg-neutral-900 min-w-[268px]"
									/>
								))
							) : Array.isArray(data?.data) && data.data.length > 0 ? (
								data.data.map((value: any) => (
									<ActiveProjectCard
										key={value.id}
										title={value.name}
										desc={value.description}
										progress={value.progress} //todo: i have to build api for this
										deadline={value.deadline}
										members={value.clientInfo}
										tasks={value.tasks}
										totalTasks={value.totalTasks}
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
		</div>
	);
}
