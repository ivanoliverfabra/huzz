"use client";

import { FormInput } from "../components/form-input";
import { ValorantRankSelect } from "../components/valorant-rank-select";
import type { PageProps } from "../types";

export function PageTwo({ values, setValues, ...props }: PageProps) {
	return (
		<div className="space-y-4" {...props}>
			<FormInput
				label="Valorant Username"
				id="username"
				type="text"
				value={values.username}
				onChange={(e) => setValues({ username: e.target.value })}
			/>
			<div className="grid md:grid-cols-2 gap-4">
				<FormInput
					label="Valorant Tag"
					id="tag"
					type="text"
					value={values.tag}
					onChange={(e) => setValues({ tag: e.target.value })}
				/>
				<ValorantRankSelect
					value={values.rank}
					onChange={(v) => setValues({ rank: v })}
				/>
			</div>
		</div>
	);
}
