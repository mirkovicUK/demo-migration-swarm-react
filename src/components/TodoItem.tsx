// src/components/TodoItem.jsx — a single row with inline edit. Exercises local
// edit state, a keyboard handler, and multiple callback props (toggle/remove/edit).
import { useState } from "react";
import { Todo } from '../lib/todos';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function TodoItem({ todo, onToggle, onRemove, onEdit }: TodoItemProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  function commit() {
    onEdit(todo.id, draft);
    setEditing(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") commit();
    if (event.key === "Escape") {
      setDraft(todo.title);
      setEditing(false);
    }
  }

  return (
    <li className={`todo-item todo-item--${todo.priority} ${todo.done ? "is-done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Toggle ${todo.title}`}
      />
      {editing ? (
        <input
          className="todo-item__edit"
          type="text"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="todo-item__title" onDoubleClick={() => setEditing(true)}>
          <span className="todo-item__ref">{todo.ref}</span> {todo.title}
        </span>
      )}
      <button className="todo-item__remove" onClick={() => onRemove(todo.id)}>
        ✕
      </button>
    </li>
  );
}