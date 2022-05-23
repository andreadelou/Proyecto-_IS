//import { usePinInputDescendant } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import "../CSS/TodoForm.css";

import AddButton from "./AddButton";
import EditButton from "./EditButton";

function TodoForm({
  title,
  onAdd,
  completed,
  onToggleCompleted,
  onEdit,
  percentage = 0,
}) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  return (
    <>
      <div className="todo-form">
        <div className="todo-form__goal">
          <div className="todo-form__title">
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
          </div>
          <div className="todo-form__progress">
            <progress></progress>
          </div>
        </div>
        <HStack marginLeft={10}>
          <AddButton onAdd={onAdd} />
          <EditButton onEdit={onEdit} />
        </HStack>
      </div>
    </>
  );
}

export default TodoForm;
