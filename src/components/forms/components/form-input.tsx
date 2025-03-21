"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function FormInput({
	label,
	className,
	...props
}: React.ComponentProps<typeof Input> & { label: string }) {
	return (
		<div className={cn("space-y-1", className)}>
			<Label htmlFor={props.id}>{label}</Label>
			<Input {...props} />
		</div>
	);
}
