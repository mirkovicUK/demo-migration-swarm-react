// src/components/TodoList.jsx — renders the visible todos, or an empty state.
// A presentational component that maps a list prop to TodoItem children.
import TodoItem from "./TodoItem";

export default function TodoList(props: {
  todos: any[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}): React.JSX.Element {
  if (props.todos.length === 0) {
    return <p className="todo-list__empty">Nothing here. Add your first task above.</p>;
  }

  return (
    <ul className="todo-list">
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={props.onToggle}
          onRemove={props.onRemove}
          onEdit={props.onEdit}
        />
      ))}
    </ul>
  );
}