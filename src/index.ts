/**
 * @wrikka/create-cli - Unified terminal prompt, UI, TUI framework, CLI framework, and data display
 * Clean Architecture with Functional Programming
 *
 * Architecture:
 * - modules/prompt/ - CLI prompts (text, select, confirm, multiselect, autocomplete, date, path, password, number, editor, search, async)
 * - modules/box/ - Box rendering
 * - modules/charts/ - Chart rendering (bar, pie, line)
 * - modules/color/ - Color utilities
 * - modules/markdown/ - Markdown rendering
 * - modules/progress/ - Progress bars
 * - modules/spinner/ - Spinners
 * - modules/tui-core/ - Reactive TUI framework core
 * - modules/tui-components/ - TUI UI components
 * - modules/theme/ - Theme system with presets
 * - modules/gradient/ - Gradient text colors
 * - modules/powerline/ - Powerline-style status bars
 * - modules/cli/ - CLI framework (command, parser, help, completion)
 * - modules/display/ - Data display (table, tree, list, keyvalue, diff, json)
 * - adapters/ - I/O adapters
 * - presentation/ - Entry points and UI rendering
 * - shared/ - Shared utilities
 */

// ============= Input Adapters =============
export {
	ensureDirectoryExists,
	handleCancel,
} from "./adapters/input/cli/prompt-adapter";
// ============= Box =============
export {
	createBox,
	getBorderChars,
	renderBox,
	validateBoxOptions,
} from "./modules/box/domain/operations";
export type {
	BorderCharacter,
	BorderStyle,
	BoxOptions,
	BoxRender,
} from "./modules/box/types";
// ============= Charts =============
export {
	renderBarChart,
	renderChart,
	renderPieChart,
	validateChartData,
	validateChartOptions,
} from "./modules/charts/domain/operations";
export type {
	ChartData,
	ChartOptions,
	ChartRender,
	ChartType,
} from "./modules/charts/types";
// ============= CLI Framework =============
export { Command } from "./modules/cli/command";
export {
	type CompletionShell,
	generateCompletion,
} from "./modules/cli/completion";
export { generateHelp } from "./modules/cli/help";
export { type ParsedArgs, parse } from "./modules/cli/parser";
export { Subcommand, type SubcommandConfig } from "./modules/cli/subcommand";
// ============= Color =============
export { Colors } from "./modules/color/domain/colors-object";
export {
	applyColorFormatting,
	createColorPalette,
	getColorCode,
	stripAnsiCodes,
} from "./modules/color/domain/operations";
export { validateColorCombination } from "./modules/color/domain/validators";
export type {
	ColorFormat,
	ColorPalette,
} from "./modules/color/types";
export {
	type DiffOptions,
	type DiffType,
	renderDiff,
} from "./modules/display/diff";
export {
	type JsonOptions,
	renderJson,
} from "./modules/display/json";
export {
	type KeyValueOptions,
	renderKeyValue,
} from "./modules/display/keyvalue";
export {
	type ListType,
	renderDefinitionList,
	renderList,
} from "./modules/display/list";
// ============= Data Display =============
export {
	renderTable,
	type TableOptions,
	type TableRow,
} from "./modules/display/table";
export {
	renderTree,
	type TreeNode,
} from "./modules/display/tree";
// ============= Gradient =============
export {
	createGradient,
	type GradientStop,
	gradient,
	gradientLine,
	gradientMulti,
	rainbow,
} from "./modules/gradient";
// ============= Markdown =============
export {
	renderMarkdown,
	validateMarkdownOptions,
} from "./modules/markdown/domain/operations";
export type {
	MarkdownElement,
	MarkdownOptions,
	MarkdownRender,
	MarkdownStyle,
} from "./modules/markdown/types";
// ============= Powerline =============
export {
	createPowerlineSegment,
	type PowerlineSegment,
	type PowerlineStyle,
	renderPowerline,
} from "./modules/powerline";
// ============= Progress =============
export {
	createProgressState,
	formatProgress,
	renderProgressBar,
} from "./modules/progress/domain/operations";
export type {
	ProgressBarOptions,
	ProgressRender,
	ProgressState,
} from "./modules/progress/types";
export type { AsyncPromptOptions } from "./modules/prompt/application/usecases/async-prompt.usecase";
export { asyncPrompt as asyncSelect } from "./modules/prompt/application/usecases/async-prompt.usecase";
export type { EditorPromptOptions } from "./modules/prompt/application/usecases/editor-prompt.usecase";
export { editorPrompt as editor } from "./modules/prompt/application/usecases/editor-prompt.usecase";
export type { NumberPromptOptions } from "./modules/prompt/application/usecases/number-prompt.usecase";
// New prompt types
export { numberPrompt as number } from "./modules/prompt/application/usecases/number-prompt.usecase";
export type { SearchPromptOptions } from "./modules/prompt/application/usecases/search-prompt.usecase";
export { searchPrompt as search } from "./modules/prompt/application/usecases/search-prompt.usecase";
// Validation hooks
export {
	type AsyncValidateFunction,
	composeAsyncValidationHooks,
	composeValidationHooks,
	createAsyncValidationHook,
	createValidationHook,
	emailHook,
	integerHook,
	maxLengthHook,
	minLengthHook,
	numberHook,
	patternHook,
	rangeHook,
	requiredHook,
	runAsyncValidation,
	runValidation,
	urlHook,
	type ValidateFunction,
	type ValidationResult,
} from "./modules/prompt/domain/operations/validation-hooks";
// ============= Spinner =============
export {
	advanceSpinner,
	startSpinner,
	stopSpinner,
} from "./modules/spinner/domain/operations";
export type {
	SpinnerOptions,
	SpinnerRender,
	SpinnerState,
} from "./modules/spinner/types";
// ============= Theme =============
export {
	applyTheme,
	createTheme,
	darkTheme,
	draculaTheme,
	getTheme,
	lightTheme,
	resetTheme,
	setTheme,
	solarizedDarkTheme,
	solarizedLightTheme,
	type Theme,
	type ThemeColors,
	type ThemePreset,
	themePresets,
} from "./modules/theme";
// ============= TUI Components =============
export type {
	BoxProps as TUIBoxProps,
	FlexProps as TUIFlexProps,
	TextProps as TUITextProps,
} from "./modules/tui-components/domain";
export {
	renderBox as renderTUIBox,
	renderFlex as renderTUIFlex,
	renderText as renderTUIText,
} from "./modules/tui-components/domain";
// ============= TUI Core =============
export {
	renderComponentUseCase,
	renderLayoutUseCase,
} from "./modules/tui-core/application/usecases/render.usecase";
export {
	applyStyles,
	calculateLayout,
	renderComponent,
} from "./modules/tui-core/domain/operations";
export type {
	Component,
	ComponentChildren,
	ComponentFunction,
	ComponentProps,
	ComponentType,
	RenderContext,
	RenderFunction,
	RenderOutput,
	Signal,
} from "./modules/tui-core/domain/types";
export type {
	IInputPort,
	IRendererPort,
	ITerminalPort,
} from "./modules/tui-core/ports/terminal.port";
// ============= Prompt API (backward compatible with @wrikka/prompt) =============
export {
	autocomplete,
	cancel,
	confirm,
	date,
	group,
	groupMultiselect,
	intro,
	isCancel,
	log,
	multiselect,
	note,
	outro,
	password,
	path,
	select,
	selectKey,
	showProgress,
	spinner,
	stream,
	taskLog,
	text,
} from "./presentation/cli/prompt-api";
// ============= Presentation =============
export {
	renderBox as renderBoxComponent,
	renderFlex as renderFlexComponent,
	renderText as renderTextComponent,
} from "./presentation/components";
// ============= Reporter (merged from @wrikka/reporter) =============
export * from "./reporter/index";
// ============= Shared =============
export {
	BOX_CONSTANTS,
	CHART_CONSTANTS,
	COLOR_CONSTANTS,
	createPrompt,
	PROGRESS_CONSTANTS,
	SPINNER_CONSTANTS,
	SPINNER_STATE_CONSTANTS,
	type TerminalConfig,
	type TerminalError,
	useTerminal,
} from "./shared";
