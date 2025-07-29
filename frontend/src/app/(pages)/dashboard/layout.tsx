import HeaderDashboard from "@/components/dashboard/header.dashboard.components";
import DashboardSidebar from "@/components/dashboard/sidebar.dashboard";
import React from "react";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="">
			<DashboardSidebar />
            <HeaderDashboard />
			{children}
		</div>
	);
};

export default LayoutDashboard;
