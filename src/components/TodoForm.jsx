//import { usePinInputDescendant } from "@chakra-ui/react";
import React, { useState } from "react";
import "../CSS/TodoForm.css";
import { v4 as uuid } from "uuid";
import AddButton from "./AddButton";

function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  function handleTaskInputChange(e) {
    setTodo({ ...todo, task: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.task.trim()) {
      addTodo({ ...todo, id: uuid() });
      //resetar el task input
      setTodo({ ...todo, task: "" });
    }
  }

  return (
    <div className="todo-form">
      <input
        type="checkbox"
        name="goal-checkbox"
        className="todo-form__check"
      />
      <input
        type="text"
        name="goal-title"
        placeholder="Nombre de tu meta"
        className="todo-form__input"
      />
      <AddButton />
    </div>
  );
}

export default TodoForm;
