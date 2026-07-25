// src/lib/filter.ts — pure filtering + sorting helpers used by the list view.
// No React; consumed by the useTodos hook (via useMemo) and unit-tested directly.
export const FILTERS: string[] = ["all", "active", "completed"];

export function filterTodos(todos: Array<{ done: boolean }>, filter: string): Array<{ done: boolean }> {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.done);
    case "completed":
      return todos.filter((t) => t.done);
    case "all":
    default:
      return todos.slice();
  }
}

const PRIORITY_RANK: { [key: string]: number } = { high: 0, normal: 1, low: 2 };

// Stable sort: incomplete first, then by priority (high → low), preserving
// insertion order within a tier.
export function sortTodos(todos: Array<{ done: boolean; priority: string }>): Array<{ done: boolean; priority: string }> {
  return todos
    .map((t, index) => ({ t, index }))
    .sort((a, b) => {
      if (a.t.done !== b.t.done) return a.t.done ? 1 : -1;
      const pr = PRIORITY_RANK[a.t.priority] - PRIORITY_RANK[b.t.priority];
      if (pr !== 0) return pr;
      return a.index - b.index;
    })
    .map(({ t }) => t);
}