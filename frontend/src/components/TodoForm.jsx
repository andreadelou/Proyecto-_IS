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
	description = ""
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
							data-testid="completedGoal"
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
					<div className="todo-form__description">
						<p>{description}</p>
					</div>
          <div className="todo-form__progress-bar">
            <div
              className="todo-form__progress-bar--progress"
              style={{
                width: `${percentage}%`,
              }}
            ></div>
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
