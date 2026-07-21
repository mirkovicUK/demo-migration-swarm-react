// src/App.tsx — top-level component wiring the hook to the presentational tree.
import { useTodos } from "./hooks/useTodos";
import AddTodo from "./components/AddTodo";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";

export default function App(): React.JSX.Element {
  const {
    visibleTodos,
    remaining,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodo,
    clearCompleted,
  } = useTodos();

  return (
    <main className="app">
      <header className="app__header">
        <h1>Task Board</h1>
        <p className="app__subtitle">
          A tiny React app for Migration Swarm to migrate.
        </p>
      </header>

      <AddTodo onAdd={addTodo} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        remaining={remaining}
        onClearCompleted={clearCompleted}
      />

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
        onEdit={editTodo}
      />
    </main>
  );
}