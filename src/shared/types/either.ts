/**
 * Either type for representing one of two possible values
 * Commonly used for error handling with Left (error) and Right (success)
 */

export type Either<L, R> = Left<L> | Right<R>;

export type Left<L> = { type: "left"; value: L };
export type Right<R> = { type: "right"; value: R };

export const left = <L, R = never>(value: L): Either<L, R> => ({
	type: "left",
	value,
});

export const right = <R, L = never>(value: R): Either<L, R> => ({
	type: "right",
	value,
});

export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> =>
	either.type === "left";

export const isRight = <L, R>(either: Either<L, R>): either is Right<R> =>
	either.type === "right";

export const map = <L, R, U>(
	either: Either<L, R>,
	fn: (value: R) => U,
): Either<L, U> => {
	if (isRight(either)) {
		return right(fn(either.value));
	}
	return either;
};

export const mapLeft = <L, R, U>(
	either: Either<L, R>,
	fn: (value: L) => U,
): Either<U, R> => {
	if (isLeft(either)) {
		return left(fn(either.value));
	}
	return either;
};

export const chain = <L, R, U>(
	either: Either<L, R>,
	fn: (value: R) => Either<L, U>,
): Either<L, U> => {
	if (isRight(either)) {
		return fn(either.value);
	}
	return either;
};
