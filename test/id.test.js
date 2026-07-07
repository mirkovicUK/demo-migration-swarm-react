// test/id.test.js — Jest (ESM). Exercises the real `nanoid` dependency.
import { describe, it, expect } from "@jest/globals";
import { newId, newShortRef } from "../src/lib/id.js";

describe("id", () => {
  it("newId returns a non-empty unique string", () => {
    const a = newId();
    const b = newId();
    expect(typeof a).toBe("string");
    expect(a.length).toBeGreaterThan(0);
    expect(a).not.toBe(b);
  });

  it("newShortRef returns a T- prefixed uppercase ref", () => {
    const ref = newShortRef();
    expect(ref).toMatch(/^T-[A-Z2-9]{6}$/);
  });
});
