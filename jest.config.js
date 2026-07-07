// Jest config (ESM). The test suite only imports the pure-logic modules under
// src/lib/*.js (no JSX), so Jest runs in native ESM mode with no transform —
// launched via `node --experimental-vm-modules` (see package.json "test").
// After migration this project runs on Vitest instead (`vitest run`).
export default {
  transform: {},
  testMatch: ["**/test/**/*.test.js"],
};
