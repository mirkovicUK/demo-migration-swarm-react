// test/filter.test.ts — Vitest (ESM).
import { describe, it, expect } from "vitest";
import { filterTodos, sortTodos, FILTERS } from "../src/lib/filter";

const sample = [
  { id: "1", priority: "low", done: false },
  { id: "2", priority: "high", done: false },
  { id: "3", priority: "normal", done: true },
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
    const tie = [
      { id: "a", priority: "normal", done: false },
      { id: "b", priority: "normal", done: false },
    ];
    expect(sortTodos(tie).map((t) => t.id)).toEqual(["a", "b"]);
  });
});