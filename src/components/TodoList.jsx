import React from "react";
import Todo from "./Todo";
import "../CSS/TodoList.css";

function TodoList({ todos, toggleComplete, removeTodo }) {
  return (
    <div className="todo-list">
      <ul className="todo-list__todos">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
