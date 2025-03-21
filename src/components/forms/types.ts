import type { Values } from "@/types";

export interface PageProps extends React.HTMLProps<HTMLDivElement> {
	values: Values;
	setValues: (values: Partial<Values>) => void;
}
