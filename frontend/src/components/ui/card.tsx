import * as React from "react";

import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"rounded-xl border bg-white dark:bg-neutral-900 text-card-foreground shadow",
				className
			)}
			{...props}
		/>
	)
);
Card.displayName = "Card";

export default Card;
