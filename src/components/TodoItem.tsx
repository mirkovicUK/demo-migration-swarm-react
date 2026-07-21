// src/components/TodoItem.jsx — a single row with inline edit. Exercises local
// edit state, a keyboard handler, and multiple callback props (toggle/remove/edit).
import { useState } from "react";

export default function TodoItem(props: { todo: { id: string; ref: string; title: string; priority: string; done: boolean; createdAt: string }; onToggle: (id: string) => void; onRemove: (id: string) => void; onEdit: (id: string, title: string) => void }): React.JSX.Element {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(props.todo.title);

  function commit() {
    props.onEdit(props.todo.id, draft);
    setEditing(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") commit();
    if (event.key === "Escape") {
      setDraft(props.todo.title);
      setEditing(false);
    }
  }

  return (
    <li className={`todo-item todo-item--${props.todo.priority} ${props.todo.done ? "is-done" : ""}`}>
      <input
        type="checkbox"
        checked={props.todo.done}
        onChange={() => props.onToggle(props.todo.id)}
        aria-label={`Toggle ${props.todo.title}`}
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
          <span className="todo-item__ref">{props.todo.ref}</span> {props.todo.title}
        </span>
      )}
      <button className="todo-item__remove" onClick={() => props.onRemove(props.todo.id)}>
        ✕
      </button>
    </li>
  );
}