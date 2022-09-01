import React from "react";
import "../CSS/Todo.css";

function Todo({ todo, toggleComplete, removeTodo, onTodoChange }) {
  return (
    <div className="todo">
      <input type="checkbox"
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
      <p>{todo.completed}</p>
    </div>
  );
}

export default Todo;
