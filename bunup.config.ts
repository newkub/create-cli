import { defineConfig } from "bunup";

/**
 * Bunup configuration for @wrikka/create-cli
 * Building with Bun's native bundler for maximum speed
 */
export default defineConfig({
	entry: "./src/index.ts",
	format: ["esm", "cjs"],
	dts: true,
	splitting: true,
	clean: true,
	// Generate package.json exports automatically
	exports: true,
	// Ensure source files are not copied to dist
	root: "./src",
});
