import React, { useState } from "react";
import "./TodoForm.css";

interface Props {
  addTodo: (title: string) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = () => {
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="todo-form">
      <input
        className="todo-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button className="todo-button" onClick={handleSubmit}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
