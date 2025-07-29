import React from "react";

const HeaderDashboard = () => {
	return (
		<header className="md:pl-55">
			<div className="flex flex-col sm:flex-row sm:justify-between  sm:items-center px-6 py-4 bg-white border-b sticky top-0 z-10 dark:bg-neutral-900 ">
				<h1 className="font-bold text-2xl text-white text-left ">Dashboard</h1>
				<input
					placeholder="Search projects, tasks, or team members..."
					className="mt-2 sm:mt-0 px-4 py-2 border rounded-md w-full sm:w-96 focus:outline-none"
				/>
			</div>
		</header>
	);
};

export default HeaderDashboard;
