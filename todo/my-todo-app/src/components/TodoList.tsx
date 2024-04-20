// src/components/TodoList.tsx
import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
