import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function tryCatch<T>(
	fn: () => Promise<T> | T,
	after?: () => void,
): Promise<[true, T] | [false, Error]> {
	try {
		return [true, await fn()];
	} catch (err) {
		return [false, err instanceof Error ? err : new Error(String(err))];
	} finally {
		after?.();
	}
}

export function tryCatchSync<T>(fn: () => T): [true, T] | [false, Error] {
	try {
		return [true, fn()];
	} catch (err) {
		return [false, err instanceof Error ? err : new Error(String(err))];
	}
}

export const parseNum = (input: string) => {
	const num = Number.parseInt(input);
	if (Number.isNaN(num)) throw new Error("INVALID_PARAM");
	return num;
};

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const splitKey = (str: string) => {
	return str.split(/(?=[A-Z])/).join(' ');
}