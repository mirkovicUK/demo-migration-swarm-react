// src/hooks/useTodos.ts — custom hook wrapping the pure reducer/filters with
// React state. Uses useReducer + useMemo + useCallback so the migration must
// type the reducer, the action union, and the callbacks under TS.
import { useReducer, useMemo, useCallback, useState } from "react";
import { todosReducer, countRemaining, Todo, TodoInput } from "../lib/todos";
import { filterTodos, sortTodos } from "../lib/filter";

const INITIAL_TODOS: Todo[] = [
  {
    id: "seed-1",
    ref: "T-SEED01",
    title: "Read the migration plan",
    priority: "high",
    done: false,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "seed-2",
    ref: "T-SEED02",
    title: "Run the demo swarm",
    priority: "normal",
    done: false,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "seed-3",
    ref: "T-SEED03",
    title: "Star the repo",
    priority: "low",
    done: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, INITIAL_TODOS);
  const [filter, setFilter] = useState<string>("all");

  const addTodo = useCallback((input: TodoInput) => dispatch({ type: "add", input }), []);
  const toggleTodo = useCallback((id: string) => dispatch({ type: "toggle", id }), []);
  const removeTodo = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const editTodo = useCallback((id: string, title: string) => dispatch({ type: "edit", id, title }), []);
  const clearCompleted = useCallback(() => dispatch({ type: "clearCompleted" }), []);

  const visibleTodos = useMemo(() => sortTodos(filterTodos(todos, filter)), [todos, filter]);
  const remaining = useMemo(() => countRemaining(todos), [todos]);

  return {
    todos,
    visibleTodos,
    remaining,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodo,
    clearCompleted,
  };
}