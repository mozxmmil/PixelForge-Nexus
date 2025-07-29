export type ClientInfo = {
	id: string;
	name: string;
};

export enum Status {
	PLANNED="PLANNED",
	ACTIVE="ACTIVE",
	COMPLETED="COMPLETED",
	ON_HOLD="ON_HOLD",
	CANCELLED="CANCELLED",
}
type ProjectData = {
	id: string;
	name: string;
	description: string;
	deadline: string; // ISO date string
	status: Status;
	createdBy: string;
	clinetId: string; // Note: "clinetId" seems like a typo, should be "clientId"
	clientInfo: ClientInfo;
};

export type Response = {
	data: ProjectData[];
};
