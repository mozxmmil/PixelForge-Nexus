"use client";
import ActiveProjectCard from "@/components/dashboard/activeProjectcard";
import RecentActivity from "@/components/dashboard/recentActively";
import StatWidget from "@/components/dashboard/startWidge";
import { Skeleton } from "@/components/ui/skeleton";
import {
	useGetAllProject,
	useHeaderData,
	useHeaderMetaData,
} from "@/hook/dashbord.hook";
import { validateHeaderName } from "http";

import {
	CheckCircle2,
	ClipboardList,
	FileWarning,
	LayoutDashboard,
	Users,
} from "lucide-react";

export default function Dashboard() {
	const { data: headerMetaData, isLoading: headerMetaDataLoading } =
		useHeaderMetaData();
	const { data: headerData, isLoading: headerLoading } = useHeaderData();
	const { data, isLoading } = useGetAllProject();
	

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-neutral-800 overflow-hidden relative">
			<div className="md:ml-55 flex flex-col">
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pt-6 ">
					{headerLoading && headerMetaDataLoading ? (
						<>
							<Skeleton className="h-[90px] w-full  rounded-xl bg-white dark:bg-neutral-900 min-w-[268px]" />
							<Skeleton className="h-[90px] w-full  rounded-xl bg-white dark:bg-neutral-900 min-w-[268px]" />
							<Skeleton className="h-[90px] w-full  rounded-xl bg-white dark:bg-neutral-900 min-w-[268px]" />
							<Skeleton className="h-[90px] w-full  rounded-xl bg-white dark:bg-neutral-900 min-w-[268px]" />
						</>
					) : (
						<>
							<StatWidget
								icon={LayoutDashboard}
								label="Total Projects"
								value={headerData?.data.totalProject ?? 0}
								change={`${
									headerMetaData?.data.totalProject ?? 0
								}% from last month`}
								changePositive
								isLoading={headerMetaDataLoading}
							/>

							<StatWidget
								icon={ClipboardList}
								label="Active Tasks"
								value={headerData?.data.activeTask ?? 0}
								change={`${
									headerMetaData?.data.activeTask ?? 0
								}% from last week`}
								changePositive
								isLoading={headerMetaDataLoading}
							/>
							<StatWidget
								icon={Users}
								label="Team Members"
								value={headerData?.data.teamMember ?? 0}
								change={`${
									headerMetaData?.data.teamMember ?? 0
								}% from last month`}
								changePositive
								isLoading={headerMetaDataLoading}
							/>
							<StatWidget
								icon={CheckCircle2}
								label="Completed Project"
								value={headerData?.data.completedTask ?? 0}
								change={`${
									headerMetaData?.data.completedTask ?? 0
								}% from last month`}
								changePositive
								isLoading={headerMetaDataLoading}
							/>
						</>
					)}
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
