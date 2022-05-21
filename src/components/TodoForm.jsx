//import { usePinInputDescendant } from "@chakra-ui/react";
import React, { useState } from "react";
import "../CSS/TodoForm.css";

import AddButton from "./AddButton";
import EditButton from "./EditButton";

function TodoForm({ title, onAdd, completed, onToggleCompleted, onEdit }) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  return (
    <div className="todo-form">
      <input
        type="checkbox"
        defaultChecked={completed}
        onChange={onToggleCompleted}
        name="goal-checkbox"
        className="todo-form__check"
      />
      <h1
        type="text"
        name="goal-title"
        placeholder="Nombre de tu meta"
        className="todo-form__input"
      >
        {title}
      </h1>
      <AddButton onAdd={onAdd} />
      <EditButton onEdit={onEdit} />
    </div>
  );
}

export default TodoForm;
