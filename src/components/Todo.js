import React from "react";
import "../CSS/Todo.css"

function Todo({ todo, toggleComplete, removeTodo }) {

    function handleCheckBoxClick() {
        toggleComplete(todo.id);
    }

    function handleREmoveClick() {
        removeTodo(todo.id);
    }

    return (
        <div className="todo">
            <input type="checkbox" onClick={handleCheckBoxClick} />
            <li
                style={
                    {
                        color: "black",
                        textDecoration: todo.completed ? "line-through" : null
                    }
                }
            >
                {todo.task}
            </li>
        </div>
    );
}

export default Todo;