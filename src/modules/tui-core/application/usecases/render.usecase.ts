/**
 * Render Use Case
 * Orchestrates component rendering with error handling
 */

import { calculateLayout, renderComponent } from "#modules/tui-core/domain";
import type { Result } from "#shared/types";

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E = Error>(error: E): Result<never, E> => ({
	success: false,
	error,
});

export const renderComponentUseCase = (
	props: Record<string, unknown>,
	children?: string,
): Result<string, Error> => {
	try {
		const output = renderComponent(props, children);
		return success(output.content);
	} catch (error) {
		return failure(error instanceof Error ? error : new Error(String(error)));
	}
};

export const renderLayoutUseCase = (
	components: readonly { content: string; width: number; height: number }[],
	direction: "row" | "column",
): Result<string, Error> => {
	try {
		const output = calculateLayout(components, direction);
		return success(output.content);
	} catch (error) {
		return failure(error instanceof Error ? error : new Error(String(error)));
	}
};
