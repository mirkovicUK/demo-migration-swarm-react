// src/components/TodoList.jsx — renders the visible todos, or an empty state.
// A presentational component that maps a list prop to TodoItem children.
import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onRemove, onEdit }) {
  if (todos.length === 0) {
    return <p className="todo-list__empty">Nothing here. Add your first task above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
