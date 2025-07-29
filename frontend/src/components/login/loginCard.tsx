"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginBox = () => {
	const router = useRouter();
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const [submitted, setSubmitted] = React.useState(false);

	async function onSubmit(values: LoginFormValues) {
		setSubmitted(true);
		try {
			const data = await axiosInstance.post("/api/auth/login", {
				email: values.email,
				password: values.password,
			});
			console.log(data);
			if (data.data.success) {
				toast.success(data.data.message);
				router.push("/dashboard");
				setSubmitted(false);
			}
		} catch (error: unknown) {
			console.log(error);
			if (error instanceof AxiosError) {
				const message =
					error.response?.data?.error || "Something went wrong";
				toast.error(message);
			} else if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Something went wrong");
			}
			setSubmitted(false);
		}
	}

	return (
		<div className="w-full max-w-md rounded-xl bg-white/80 dark:bg-neutral-900/80 shadow-lg p-8 border border-neutral-200 dark:border-neutral-800">
			<h2 className="text-3xl font-bold mb-6 text-center text-primary">
				Login to your account
			</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="you@email.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="w-full text-base font-semibold py-2 mt-5"
					>
						Login
						{submitted && <LoaderCircle className="ml-2 animate-spin" />}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginBox;
