// test/todos.test.ts — Vitest (ESM).
import { describe, it, expect } from "vitest";
import {
  createTodo,
  todosReducer,
  countRemaining,
  PRIORITIES,
  Todo,
} from "../src/lib/todos";

describe("todos", () => {
  it("createTodo builds a todo with a generated id and ref", () => {
    const todo = createTodo({ title: "Ship it" });
    expect(todo.id).toBeTruthy();
    expect(todo.ref).toMatch(/^T-/);
    expect(todo.done).toBe(false);
    expect(todo.priority).toBe("normal");
  });

  it("createTodo trims the title and throws when empty", () => {
    expect(createTodo({ title: "  hi  " }).title).toBe("hi");
    expect(() => createTodo({ title: "   " })).toThrow(/title is required/);
  });

  it("createTodo falls back to normal for an unknown priority", () => {
    expect(createTodo({ title: "x", priority: "urgent" }).priority).toBe("normal");
    for (const p of PRIORITIES) {
      expect(createTodo({ title: "x", priority: p }).priority).toBe(p);
    }
  });

  it("reducer add appends a new todo", () => {
    const next = todosReducer([], { type: "add", input: { title: "A" } });
    expect(next).toHaveLength(1);
    expect(next[0].title).toBe("A");
  });

  it("reducer toggle flips done without mutating the input", () => {
    const state: Todo[] = [
      { id: "1", ref: "T-ABC123", title: "A", priority: "normal", done: false, createdAt: "" },
    ];
    const next = todosReducer(state, { type: "toggle", id: "1" });
    expect(next[0].done).toBe(true);
    expect(state[0].done).toBe(false);
  });

  it("reducer remove drops the matching todo", () => {
    const state: Todo[] = [
      { id: "1", ref: "T-AAA111", title: "A", priority: "normal", done: false, createdAt: "" },
      { id: "2", ref: "T-BBB222", title: "B", priority: "normal", done: false, createdAt: "" },
    ];
    const result = todosReducer(state, { type: "remove", id: "1" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("reducer edit updates the title and ignores blank edits", () => {
    const state: Todo[] = [
      { id: "1", ref: "T-CCC333", title: "old", priority: "normal", done: false, createdAt: "" },
    ];
    expect(todosReducer(state, { type: "edit", id: "1", title: "new" })[0].title).toBe("new");
    expect(todosReducer(state, { type: "edit", id: "1", title: "  " })[0].title).toBe("old");
  });

  it("reducer clearCompleted keeps only active todos", () => {
    const state: Todo[] = [
      { id: "1", ref: "T-DDD444", title: "A", priority: "normal", done: true, createdAt: "" },
      { id: "2", ref: "T-EEE555", title: "B", priority: "normal", done: false, createdAt: "" },
    ];
    const result = todosReducer(state, { type: "clearCompleted" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
    expect(result[0].done).toBe(false);
  });

  it("reducer returns state unchanged for an unknown action", () => {
    const state: Todo[] = [
      { id: "1", ref: "T-FFF666", title: "A", priority: "normal", done: false, createdAt: "" },
    ];
    expect(todosReducer(state, { type: "nope" } as any)).toBe(state);
  });

  it("countRemaining counts only the active todos", () => {
    const todos: Todo[] = [
      { id: "1", ref: "T-GGG777", title: "A", priority: "normal", done: false, createdAt: "" },
      { id: "2", ref: "T-HHH888", title: "B", priority: "normal", done: true, createdAt: "" },
      { id: "3", ref: "T-III999", title: "C", priority: "normal", done: false, createdAt: "" },
    ];
    expect(countRemaining(todos)).toBe(2);
  });
});