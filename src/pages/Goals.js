import React, {useState} from 'react';
import TodoForm from "../components/TodoForm.js";
import TodoList from "../components/TodoList.js";
import "../CSS/Goals.css";

function Goals() {
    const[todos,setTodos]=useState([]);

    function addTodo(todo){
        setTodos([todo,...todos]);
    }


    return (
        <div className="Goals">
            <header className="Goals-header">
                <p>Metas</p>
                <TodoForm addTodo={addTodo} />
                <TodoList todos={todos} />
            </header>
        </div>

    )
}

export default Goals