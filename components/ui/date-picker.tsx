"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
	value?: Date;
	onChange: (date: Date | undefined) => void;
	placeholder?: string;
	captionLayout?: "dropdown" | "label" | "dropdown-years";
	fromYear?: number;
	toYear?: number;
	className?: string;
};

const DatePicker = ({
	value,
	onChange,
	placeholder = "Pick a date",
	captionLayout = "dropdown",
	fromYear = 1950,
	toYear = new Date().getFullYear(),
	className,
}: Props) => (
	<Popover>
		<PopoverTrigger asChild>
			<Button
				variant="outline"
				data-empty={!value}
				className={cn(
					"w-full justify-start text-left font-normal bg-white data-[empty=true]:text-muted-foreground",
					className,
				)}
			>
				<CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
				{value ? format(value, "PPP") : <span>{placeholder}</span>}
			</Button>
		</PopoverTrigger>
		<PopoverContent className="w-auto p-0" align="start">
			<Calendar
				mode="single"
				selected={value}
				onSelect={onChange}
				captionLayout={captionLayout}
				fromYear={fromYear}
				toYear={toYear}
				initialFocus
			/>
		</PopoverContent>
	</Popover>
);

export default DatePicker;
