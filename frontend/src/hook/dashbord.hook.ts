import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Response } from "@/types/zod/projectData.type.zod";

export const useGetAllProject = () => {
	const [data, setData] = useState<Response | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get("/api/dashboard");
				
				if (response.data.success) {
					setData(response.data);
				}
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Something went wrong");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return { data, loading, error };
};
