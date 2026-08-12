/**
 * Group and task group
 */

import { getSessionCancelled } from "./session";

// Grouping
export const group = async <T>(
	_name: string,
	callbacks: Record<string, () => Promise<T>>,
	options?: { onCancel?: () => void },
): Promise<Record<string, T>> => {
	const results: Record<string, T> = {} as Record<string, T>;

	for (const [key, callback] of Object.entries(callbacks)) {
		if (getSessionCancelled()) {
			options?.onCancel?.();
			break;
		}
		results[key] = await callback();
	}

	return results;
};
