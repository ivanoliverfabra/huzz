"use client";

import { FormTextArea } from "../components/form-textarea";
import type { PageProps } from "../types";

export function PageThree({ values, setValues, ...props }: PageProps) {
	return (
		<div className="space-y-4" {...props}>
			<FormTextArea
				maxLength={256}
				rows={3}
				className="resize-none"
				label="Why are you applying?"
				id="why"
				value={values.why}
				onChange={(e) => setValues({ why: e.target.value })}
			/>
			<FormTextArea
				maxLength={256}
				rows={3}
				className="resize-none"
				label="What's your availability like?"
				id="availability"
				value={values.availability}
				onChange={(e) => setValues({ availability: e.target.value })}
			/>
			<FormTextArea
				maxLength={256}
				rows={3}
				className="resize-none"
				label="What's your preferred communication style?"
				id="communicationStyle"
				value={values.communicationStyle}
				onChange={(e) => setValues({ communicationStyle: e.target.value })}
			/>
		</div>
	);
}
