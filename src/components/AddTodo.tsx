// src/components/AddTodo.tsx — controlled form. Exercises useState, a form
// submit handler, and a change handler on a <select> — all things the React
// profile's TS rewrite must type (React.FormEvent / React.ChangeEvent, props).
import { useState } from "react";
import { PRIORITIES } from "../lib/todos.js";

interface AddTodoProps {
  onAdd: (input: { title: string; priority: string }) => void;
}

export default function AddTodo(props: AddTodoProps): React.JSX.Element {
  const { onAdd } = props;
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, priority });
    setTitle("");
    setPriority("normal");
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        className="add-todo__title"
        type="text"
        placeholder="Add a task…"
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        aria-label="Task title"
      />
      <select
        className="add-todo__priority"
        value={priority}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setPriority(event.target.value)}
        aria-label="Priority"
      >
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}