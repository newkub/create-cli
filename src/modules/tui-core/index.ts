/**
 * TUI Core Module Public API
 * Reactive TUI Framework - Core functionality
 */

// Application layer - Use cases and orchestration
export { renderComponentUseCase, renderLayoutUseCase } from "./application";
// Domain layer - Pure business logic
export { applyStyles, calculateLayout, renderComponent } from "./domain";

// Ports - Interface definitions
export type { IInputPort, IRendererPort, ITerminalPort } from "./ports";
