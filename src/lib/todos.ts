// src/lib/todos.ts — pure todo model + reducer.
// Framework-agnostic business logic: no React here. The useTodos hook wraps
// these pure functions with useReducer, and the components render their output.
// Consumes the HOT id module; consumed by the hook and the filter helpers.
import { newId, newShortRef } from "./id.js";

export const PRIORITIES: string[] = ["low", "normal", "high"];

export function createTodo(input: any): any {
  const title = (input && input.title ? String(input.title) : "").trim();
  if (!title) {
    throw new Error("Cannot create todo: title is required");
  }
  const priority = PRIORITIES.includes(input && input.priority)
    ? input.priority
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
export function todosReducer(state: any[], action: any): any[] {
  switch (action.type) {
    case "add":
      return [...state, createTodo(action.input)];
    case "toggle":
      return state.map((t: any) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "remove":
      return state.filter((t: any) => t.id !== action.id);
    case "edit":
      return state.map((t: any) =>
        t.id === action.id ? { ...t, title: action.title.trim() || t.title } : t
      );
    case "clearCompleted":
      return state.filter((t: any) => !t.done);
    default:
      return state;
  }
}

export function countRemaining(todos: any[]): number {
  return todos.reduce((n: number, t: any) => (t.done ? n : n + 1), 0);
}