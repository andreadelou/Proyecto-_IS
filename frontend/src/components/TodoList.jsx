import React from "react";
import Todo from "./Todo";
import "../CSS/TodoList.css";

function TodoList({ todos, toggleComplete, removeTodo, onTodoChange }) {
  return (
    <div className="todo-list">
      <ul className="todo-list__todos">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            toggleComplete={() => {
              toggleComplete(index, todo);
            }}
            onTodoChange={(value) => {
              onTodoChange(index, todo, value);
            }}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
