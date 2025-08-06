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
import { useCreateProject } from "@/hook/dashbord.hook";
import { formSchema } from "@/types/zod/projectData.type.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar28Controlled } from "../layout/date";

const CreateProjectDashboard = () => {
	const { mutateAsync, isPending, isSuccess } = useCreateProject();

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

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		await mutateAsync(data);
		if (isSuccess) form.reset();
	};
	return (
		<div className="w-full h-full md:ml-55 bg-gray-100 dark:bg-neutral-900 overflow-hidden transition-colors duration-300">
			<div className="w-full h-full py-5 px-8">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create Project</h1>
				<div className="max-w-4xl mt-10 border border-gray-200 dark:border-zinc-700 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg transition-colors duration-300">
					<Form {...form}>
						<form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-10"
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
												className="resize-none rounded-sm"
												placeholder="Description"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex gap-2 w-full items-end justify-between">
								<FormField
									control={form.control}
									name="deadline"
									render={() => (
										<FormItem className="w-full ">
											<FormControl>
												<Calendar28Controlled
													control={form.control}
													name="deadline"
													label="Deadline Date"
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
											<FormControl className="w-full">
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger className="w-1/2">
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

							<Button type="submit">
								Create Project
								{isPending && (
									<LucideLoaderCircle className="animate-spin" />
								)}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default CreateProjectDashboard;
