import React, { useEffect, useState } from 'react';
import TodoForm from "../components/TodoForm.js";
import TodoList from "../components/TodoList.js";
import "../Goals.css";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function Goals() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    function addTodo(todo) {
        setTodos([todo, ...todos]);
    }

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    function addTodo(todo) {
        setTodos([todo, ...todos]);
    }

    function toggleComplete(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id == id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        );
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div className="Goals">

            <header className="Goals-header">
                <p>Metas</p>
                <TodoForm addTodo={addTodo} />
                <TodoList
                    todos={todos}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                />
            </header>
        </div>

    )
}

export default Goals