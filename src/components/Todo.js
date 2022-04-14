import React from "react";

function Todo({todo, toggleComplete, removeTodo}){

    function handleCheckBoxClick(){
        toggleComplete(todo.id);
    }

    function handleREmoveClick(){
        removeTodo(todo.id);
    }

    return(
        <div style={{display:"flex"}}   >
            <input type="checkbox" onClick={handleCheckBoxClick} />
            <li
                style={
                    {
                        color:"black",
                        textDecoration: todo.completed ? "line-through" : null
                    }
                }
            >
                {todo.task}
            </li>
            <button onClick={handleREmoveClick}>X</button>
        </div>
    );
}

export default Todo;