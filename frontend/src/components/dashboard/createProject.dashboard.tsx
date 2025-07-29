"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar28Controlled } from "../layout/date";

const formSchema = z.object({
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
const CreateProjectDashboard = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			deadline: new Date(),
			clientname: "",
			clientphone: "",
			status: "PLANNED",
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data);
	};
	return (
		<div className="w-full h-screen bg-[rgba(0,0,0,0.5)] dark:bg-black absolute left-0 top-0 md:ml-55 overflow-hidden">
			<div className="w-full h-full p-19">
				<h1 className="text-2xl font-bold text-white ">Create Project</h1>
				<div className="max-w-4xl p-3 mt-10 border rounded-lg">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Name</FormLabel>
										<FormControl>
											<Input placeholder="Product Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<textarea
												className="resize-none"
												placeholder="Description"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex gap-2 w-full bg-red-400 items-center">
								<FormField
									control={form.control}
									name="deadline"
									render={() => (
										<FormItem className="w-full">
											<FormLabel>Deadline</FormLabel>
											<FormControl>
												<Calendar28Controlled
													control={form.control}
													name="deadline"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Status</FormLabel>
											<FormControl>
												<Select
                                                
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="ACTIVE" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="PLANNED">
															PLANNED
														</SelectItem>
														<SelectItem value="ACTIVE">
															ACTIVE
														</SelectItem>
						
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex gap-2 w-full ">
								<FormField
									control={form.control}
									name="clientname"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													className="w-full"
													placeholder="Client Name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="clientphone"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input
													placeholder="Client Phone"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default CreateProjectDashboard;
