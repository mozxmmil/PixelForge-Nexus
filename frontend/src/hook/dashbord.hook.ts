import { axiosInstance } from "@/lib/axios";
import {
	FromSchema,
	ProjectSummary,
	Response,
} from "@/types/zod/projectData.type.zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useUserStore } from "@/zustand/userData.zustand";
import { useEffect } from "react";
import type { user } from "@/zustand/userData.zustand";

export const useGetAllProject = () => {
	const data = useQuery<Response>({
		queryKey: ["all-project"],
		queryFn: async () => {
			const response = await axiosInstance.get("/api/dashboard");
			return response.data;
		},
	});
	return data;
};

export const useCreateProject = () => {
	const client = useQueryClient();
	const data = useMutation({
		mutationFn: async (projectData: FromSchema) => {
			const response = await axiosInstance.post(
				"/api/dashboard/createproject",
				projectData
			);
			return response.data;
		},
		onSuccess: () => {
			toast.success("project added");
			client.invalidateQueries({ queryKey: ["all-project"] });
		},
		onError: (e) => {
			toast.error(e.message);
		},
	});
	return data;
};

export const useHeaderData = () => {
	const data = useQuery<ProjectSummary>({
		queryKey: ["header-data"],
		queryFn: async () => {
			const response = await axiosInstance.get("/api/dashboard/headerdata");
			return response.data;
		},
	});
	return data;
};

export const useHeaderMetaData = () => {
	const data = useQuery({
		queryKey: ["header-sub-data"],
		queryFn: async () => {
			const response = await axiosInstance.get(
				"/api/dashboard/headerSubData"
			);
			return response.data;
		},
	});
	return data;
};

export const useGetCurrentUser = () => {
	const setUser = useUserStore((state) => state.setUser);
	const data = useQuery({
		queryKey: ["current-user"],
		queryFn: async () => {
			const response = await axiosInstance.get(
				"/api/dashboard/getCurrentUser"
			);

			return response.data;
		},
	});
	setUser(data.data.data);
};
