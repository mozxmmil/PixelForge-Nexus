"use client";
import { useHeaderData, useHeaderMetaData } from "@/hook/dashbord.hook";
import { Skeleton } from "../ui/skeleton";
import StatWidget from "./startWidge";

import {
	CheckCircle2,
	ClipboardList,
	LayoutDashboard,
	Users,
} from "lucide-react";

const HeaderMetaData = () => {
	const { data: headerMetaData, isLoading: headerMetaDataLoading } =
		useHeaderMetaData();
	const { data: headerData, isLoading: headerLoading } = useHeaderData();

	return (
		<>
			{headerLoading ? (
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
						change={`${headerMetaData?.data.totalProject}% from last month`}
						changePositive
						isLoading={headerMetaDataLoading}
					/>

					<StatWidget
						icon={ClipboardList}
						label="Active Tasks"
						value={headerData?.data.activeTask ?? 0}
						change={`${headerMetaData?.data.activeTask}% from last week`}
						changePositive
						isLoading={headerMetaDataLoading}
					/>
					<StatWidget
						icon={Users}
						label="Team Members"
						value={headerData?.data.teamMember ?? 0}
						change={`${headerMetaData?.data.totalMember}% from last month`}
						changePositive
						isLoading={headerMetaDataLoading}
					/>
					<StatWidget
						icon={CheckCircle2}
						label="Completed Project"
						value={headerData?.data.completedTask ?? 0}
						change={`${headerMetaData?.data.completedProject}% from last month`}
						changePositive
						isLoading={headerMetaDataLoading}
					/>
				</>
			)}
		</>
	);
};

export default HeaderMetaData;
