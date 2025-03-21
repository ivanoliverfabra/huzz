"use client";

import { FormTextArea } from "../components/form-textarea";
import type { PageProps } from "../types";

export function PageFour({ values, setValues, ...props }: PageProps) {
	return (
		<div className="space-y-4" {...props}>
			<FormTextArea
				maxLength={256}
				rows={3}
				className="resize-none"
				label="What are your gaming preferences and play style?"
				id="gamingPreferences"
				value={values.gamingPreferences}
				onChange={(e) => setValues({ gamingPreferences: e.target.value })}
			/>
			<FormTextArea
				maxLength={256}
				rows={3}
				className="resize-none"
				label="What are your expectations for dates and hanging out?"
				id="dateExpectations"
				value={values.dateExpectations}
				onChange={(e) => setValues({ dateExpectations: e.target.value })}
			/>
		</div>
	);
}
