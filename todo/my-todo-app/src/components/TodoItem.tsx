// src/components/TodoItem.tsx
import React, { useState } from "react";
import "./TodoItem.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    if (!editText.trim()) {
      // Prevent saving empty text
      return;
    }
    updateTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <>
            <span className="todo-text">{todo.title}</span>
            <span className="todo-status">
              {todo.completed ? "Completed" : "Incomplete"}
            </span>
          </>
        )}
      </div>
      <div className="todo-item-actions">
        <button className="todo-buttons delete-button" onClick={handleDelete}>
          Delete
        </button>
        {isEditing ? (
          <button className="todo-buttons edit-button" onClick={handleEdit}>
            Save
          </button>
        ) : (
          <button
            className="todo-buttons edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
