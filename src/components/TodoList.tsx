// src/components/TodoList.tsx — renders the visible todos, or an empty state.
// A presentational component that maps a list prop to TodoItem children.
import TodoItem from "./TodoItem";

import { Todo } from '../lib/todos';

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function TodoList(props: TodoListProps): JSX.Element {
  const { todos, onToggle, onRemove, onEdit } = props;

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