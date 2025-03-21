"use client";

import { FormInput } from "../components/form-input";
import { FormTextArea } from "../components/form-textarea";
import type { PageProps } from "../types";

export function PageOne({ values, setValues, ...props }: PageProps) {
	return (
		<div className="space-y-4" {...props}>
			<div className="flex items-center justify-between gap-x-4">
				<FormInput
					className="w-full flex-1"
					label="Name"
					id="name"
					type="text"
					value={values.name}
					onChange={(e) => setValues({ name: e.target.value })}
				/>
				<FormInput
					className="w-20"
					label="Age"
					id="age"
					type="text"
					inputMode="numeric"
					value={values.age}
					onChange={(e) => setValues({ age: e.target.value })}
				/>
			</div>
			<FormTextArea
				maxLength={512}
				rows={4}
				className="resize-none"
				label="About Yourself"
				id="about"
				value={values.about}
				onChange={(e) => setValues({ about: e.target.value })}
			/>
		</div>
	);
}
