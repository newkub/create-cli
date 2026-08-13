export class ValidationError extends Error {
	override readonly name = "ValidationError";
	constructor(
		message: string,
		public readonly field?: string,
		public readonly value?: unknown,
	) {
		super(message);
	}
}

export class ReportingError extends Error {
	override readonly name = "ReportingError";
	constructor(
		message: string,
		public readonly reporter: string,
		public override readonly cause?: Error,
	) {
		super(message);
	}
}

export class FormattingError extends Error {
	override readonly name = "FormattingError";
	constructor(
		message: string,
		public readonly format: string,
		public override readonly cause?: Error,
	) {
		super(message);
	}
}

export class OutputError extends Error {
	override readonly name = "OutputError";
	constructor(
		message: string,
		public readonly output: string,
		public override readonly cause?: Error,
	) {
		super(message);
	}
}
