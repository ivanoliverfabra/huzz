"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function FormTextArea({
	label,
	...props
}: React.ComponentProps<typeof Textarea> & { label: string }) {
	return (
		<div className="space-y-1">
			<Label htmlFor={props.id}>{label}</Label>
			<Textarea {...props} />
		</div>
	);
}
