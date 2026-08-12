export function identity<T>(value: T): T {
	return value;
}

export function compose<T, U, V>(f: (x: U) => V, g: (x: T) => U): (x: T) => V {
	return (x) => f(g(x));
}

export function pipe<T, U, V>(g: (x: T) => U, f: (x: U) => V): (x: T) => V {
	return (x) => f(g(x));
}
