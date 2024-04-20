// src/App.tsx
import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./interfaces";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/todos/");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, completed: false }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      loadTodos(); // Todo 목록을 다시 불러옵니다.
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/todos/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to toggle todo");
      }
      loadTodos(); // Todo 목록을 다시 불러옵니다.
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
};

export default App;
