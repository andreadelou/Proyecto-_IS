import React from "react";
import "../CSS/Todo.css";

function Todo({ todo, toggleComplete, removeTodo, onTodoChange }) {
  function handleCheckBoxClick() {
    toggleComplete(todo.id);
  }

  return (
    <div className="todo">
      <input type="checkbox"
        onClick={handleCheckBoxClick}
        onChange={() => { toggleComplete(!todo.completed) }}
        defaultChecked={todo.completed}
      />
      <input
        type="text"
        className="todo__input"
        name="todo-input"
        placeholder="Escribe la sub tarea"
        defaultValue={todo.value}
        onChange={(e) => { onTodoChange(e.target.value) }}
      />
    </div>
  );
}

export default Todo;
