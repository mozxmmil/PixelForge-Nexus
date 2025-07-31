import z from "zod";

export type ClientInfo = {
	id: string;
	name: string;
};

export enum Status {
	PLANNED = "PLANNED",
	ACTIVE = "ACTIVE",
	COMPLETED = "COMPLETED",
	ON_HOLD = "ON_HOLD",
	CANCELLED = "CANCELLED",
}
export type ProjectData = {
	id: string;
	name: string;
	description: string;
	deadline: string; // ISO date string
	status: Status;
	createdBy: string;
	clinetId: string; // Note: "clinetId" seems like a typo, should be "clientId"
	clientInfo: ClientInfo;
	progress: number;
	tasks: number;
	totalTasks: number;
};

export type Response = {
	data: ProjectData[];
};

export const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name is Must.",
	}),
	description: z.string().min(2, {
		message: "Description is Must.",
	}),
	deadline: z.date(),
	clientname: z.string().min(2, {
		message: "Client Name is Must.",
	}),
	clientphone: z.string().min(2, {
		message: "Client Phone is Must.",
	}),
	status: z.enum(["PLANNED", "ACTIVE"]),
});

export type FromSchema = z.infer<typeof formSchema>;

export type ProjectSummary = {
	data: {
		totalProject: number;
		activeTask: number;
		completedTask: number;
		teamMember: number;
	};
};
