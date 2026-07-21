// src/lib/todos.js — pure todo model + reducer.
// Framework-agnostic business logic: no React here. The useTodos hook wraps
// these pure functions with useReducer, and the components render their output.
// Consumes the HOT id module; consumed by the hook and the filter helpers.
import { newId, newShortRef } from "./id.js";

export const PRIORITIES: string[] = ["low", "normal", "high"];

export function createTodo(input: { title?: string | undefined; priority?: string | undefined }): { id: string; ref: string; title: string; priority: string; done: boolean; createdAt: string } {
  const title = (input && input.title ? String(input.title) : "").trim();
  if (!title) {
    throw new Error("Cannot create todo: title is required");
  }
  const priority = PRIORITIES.includes(input && input.priority ? input.priority : "")
    ? (input && input.priority ? input.priority : "")
    : "normal";
  return {
    id: newId(),
    ref: newShortRef(),
    title,
    priority,
    done: false,
    createdAt: new Date().toISOString(),
  };
}

// Reducer actions: add | toggle | remove | edit | clearCompleted.
export function todosReducer(state: Array<{ id: string; ref: string; title: string; priority: string; done: boolean; createdAt: string }>, action: { type: string; input?: any; id?: string; title?: string }): Array<{ id: string; ref: string; title: string; priority: string; done: boolean; createdAt: string }> {
  switch (action.type) {
    case "add":
      return [...state, createTodo(action.input)];
    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    case "edit":
      return state.map((t) =>
        t.id === action.id ? { ...t, title: action.title ? action.title.trim() : t.title } : t
      );
    case "clearCompleted":
      return state.filter((t) => !t.done);
    default:
      return state;
  }
}

export function countRemaining(todos: Array<{ done: boolean }>): number {
  return todos.reduce((n, t) => (t.done ? n : n + 1), 0);
}