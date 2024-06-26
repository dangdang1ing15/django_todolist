// src/App.tsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
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
      loadTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/todos/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      loadTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const updateTodo = async (id: number, title: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/todos/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      loadTodos(); // Refresh todos
    } catch (error) {
      console.error("Failed to update todo:", error);
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
      loadTodos();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  return (
    <div id="app">
      <Header />
      <div className="todo-form-container">
        <TodoForm addTodo={addTodo} />
      </div>
      <ul className="todo-list">
        {" "}
        {
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        }
      </ul>
    </div>
  );
};

export default App;
