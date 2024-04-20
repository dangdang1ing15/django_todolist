// src/components/TodoForm.tsx
import React, { useState } from "react";

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
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
