//import { usePinInputDescendant } from "@chakra-ui/react";
import React, { useState } from "react";
import "../CSS/TodoForm.css";

import AddButton from "./AddButton";

function TodoForm({ title, onAdd, completed }) {
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
    </div>
  );
}

export default TodoForm;
