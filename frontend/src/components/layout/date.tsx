"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { Control, ControllerRenderProps } from "react-hook-form";

function formatDate(date: Date | undefined) {
	if (!date) return "";
	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

function isValidDate(date: Date | undefined) {
	return date instanceof Date && !isNaN(date.getTime());
}

type Props = {
	control: Control<any>;
	name: string;
	label?: string;
};

export function Calendar28Controlled({
	control,
	name,
	label = "Deadline",
}: Props) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col gap-3">
					<FormLabel>{label}</FormLabel>

					<CalendarInput field={field} />
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function CalendarInput({
	field,
}: {
	field: ControllerRenderProps<any, string>;
}) {
	const [open, setOpen] = React.useState(false);
	const [month, setMonth] = React.useState<Date | undefined>(field.value);

	return (
		<div className="relative flex gap-2">
			<Input
				value={formatDate(field.value)}
				onChange={(e) => {
					const newDate = new Date(e.target.value);
					field.onChange(isValidDate(newDate) ? newDate : undefined);
				}}
				onKeyDown={(e) => {
					if (e.key === "ArrowDown") {
						e.preventDefault();
						setOpen(true);
					}
				}}
				placeholder="June 01, 2025"
				className="bg-background pr-10"
			/>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id="date-picker"
						variant="ghost"
						className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
					>
						<CalendarIcon className="size-3.5" />
						<span className="sr-only">Select date</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="end"
					alignOffset={-8}
					sideOffset={10}
				>
					<Calendar
						mode="single"
						selected={field.value}
						captionLayout="dropdown"
						month={month}
						onMonthChange={setMonth}
						onSelect={(date) => {
							field.onChange(date);
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
