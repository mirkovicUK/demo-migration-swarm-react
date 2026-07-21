// test/filter.test.ts — Vitest (ESM).
import { describe, it, expect } from "vitest";
import { filterTodos, sortTodos, FILTERS } from "../src/lib/filter";
import { Todo } from "../src/lib/todos";

const sample: Todo[] = [
  { id: "1", ref: "T-000001", title: "Task 1", priority: "low", done: false, createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "2", ref: "T-000002", title: "Task 2", priority: "high", done: false, createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "3", ref: "T-000003", title: "Task 3", priority: "normal", done: true, createdAt: "2026-01-01T00:00:00.000Z" },
];

describe("filter", () => {
  it("exposes the three filter names", () => {
    expect(FILTERS).toEqual(["all", "active", "completed"]);
  });

  it("filterTodos all returns a copy of every todo", () => {
    const out = filterTodos(sample, "all");
    expect(out).toHaveLength(3);
    expect(out).not.toBe(sample);
  });

  it("filterTodos active drops completed todos", () => {
    expect(filterTodos(sample, "active").map((t) => t.id)).toEqual(["1", "2"]);
  });

  it("filterTodos completed keeps only done todos", () => {
    expect(filterTodos(sample, "completed").map((t) => t.id)).toEqual(["3"]);
  });

  it("filterTodos falls back to all for an unknown filter", () => {
    expect(filterTodos(sample, "bogus")).toHaveLength(3);
  });

  it("sortTodos puts active before done, then high→low priority", () => {
    expect(sortTodos(sample).map((t) => t.id)).toEqual(["2", "1", "3"]);
  });

  it("sortTodos is stable within a priority tier", () => {
    const tie: Todo[] = [
      { id: "a", ref: "T-000004", title: "Task A", priority: "normal", done: false, createdAt: "2026-01-01T00:00:00.000Z" },
      { id: "b", ref: "T-000005", title: "Task B", priority: "normal", done: false, createdAt: "2026-01-01T00:00:00.000Z" },
    ];
    expect(sortTodos(tie).map((t) => t.id)).toEqual(["a", "b"]);
  });
});