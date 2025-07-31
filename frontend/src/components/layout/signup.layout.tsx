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
import { RoleDropdown } from "../common/roleDropdown";
import { LoaderCircle } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const signUpSchema = z.object({
	name: z.string().min(2, "Name is too short"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	role: z.enum(["admin", "developer"]),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpBox = () => {
	const router = useRouter();
	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: { name: "", email: "", password: "", role: "developer" },
	});

	const [submitted, setSubmitted] = React.useState(false);

	async function onSubmit(values: SignUpFormValues) {
		setSubmitted(true);
		const role = values.role.toUpperCase();

		try {
			const data = await axiosInstance.post("/api/auth/signup", {
				name: values.name,
				email: values.email,
				password: values.password,
				role,
			});

			if (data.data.success) {
				toast.success(data.data.message);
				router.push("/dashboard");
				setSubmitted(false);
			}
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				const message =
					error.response?.data?.error || "Something went wrong";
				toast.error(message);
			} else if (error instanceof Error) {
				// general JS error
				toast.error(error.message);
			} else {
				// unknown type ka error (string ya koi aur ho sakta hai)
				toast.error("Something went wrong");
			}

			setSubmitted(false);
		}
	}

	return (
		<div className="w-full max-w-md rounded-xl bg-white/80 dark:bg-neutral-900/80 shadow-lg p-8 border border-neutral-200 dark:border-neutral-800">
			<h2 className="text-3xl font-bold mb-6 text-center text-primary">
				Create your account
			</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Your name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<FormControl>
									<RoleDropdown
										value={field.value}
										onChange={field.onChange}
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
						Sign Up{" "}
						{submitted && <LoaderCircle className="ml-2 animate-spin" />}
					</Button>
				</form>
			</Form>
			<div className="mt-6 text-center text-sm text-neutral-700 dark:text-neutral-300">
				Already have an account?{" "}
				<Link
					href="/login"
					className="text-primary font-semibold hover:underline"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default SignUpBox;
