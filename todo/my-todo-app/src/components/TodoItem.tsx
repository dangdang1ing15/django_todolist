// src/components/TodoItem.tsx
import React from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {todo.title} - {todo.completed ? "Completed" : "Incomplete"}
    </li>
  );
};

export default TodoItem;
