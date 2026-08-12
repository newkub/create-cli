/**
 * Pure validation schemas for prompt inputs using Zod
 * No side effects, reusable schemas with type inference
 */

import { z } from "zod";

// Base schemas
export const requiredSchema = z
	.string()
	.transform((val) => val.trim())
	.refine((val) => val.length > 0, { message: "This field is required" });

export const minLengthSchema = (min: number) =>
	z.string().min(min, { message: `Must be at least ${min} characters` });

export const maxLengthSchema = (max: number) =>
	z.string().max(max, { message: `Must be at most ${max} characters` });

export const emailSchema = z
	.string()
	.email({ message: "Must be a valid email address" });

export const patternSchema = (pattern: RegExp, message: string) =>
	z.string().regex(pattern, { message });

// Type inference
export type RequiredValue = z.infer<typeof requiredSchema>;
export type EmailValue = z.infer<typeof emailSchema>;

// Composed schemas using spread syntax for better TypeScript compilation
export const stringValidationSchema = z.object({
	value: z.string(),
});

export const composedStringSchema = {
	...stringValidationSchema.shape,
	minLength: minLengthSchema(3),
	maxLength: maxLengthSchema(100),
};

// Schema for string with length constraints
export const lengthConstrainedStringSchema = z
	.string()
	.min(3, { message: "Must be at least 3 characters" })
	.max(100, { message: "Must be at most 100 characters" });

export type LengthConstrainedString = z.infer<
	typeof lengthConstrainedStringSchema
>;

// Validation functions using .safeParse() for user input
export const validateRequired = (value: string) =>
	requiredSchema.safeParse(value);

export const validateMinLength = (min: number) => (value: string) =>
	minLengthSchema(min).safeParse(value);

export const validateMaxLength = (max: number) => (value: string) =>
	maxLengthSchema(max).safeParse(value);

export const validateEmail = (value: string) => emailSchema.safeParse(value);

export const validatePattern =
	(pattern: RegExp, message: string) => (value: string) =>
		patternSchema(pattern, message).safeParse(value);

// Compose validators using Zod's built-in composition
export const composeValidators = (...schemas: z.ZodTypeAny[]) => {
	if (schemas.length === 0) return z.any();
	if (schemas.length === 1) return schemas[0];
	let result = schemas[0];
	for (let i = 1; i < schemas.length; i++) {
		result = result.and(schemas[i]);
	}
	return result;
};
