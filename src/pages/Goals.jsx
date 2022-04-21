import React, { useEffect, useState } from "react";
import "../CSS/Goals.css";
import Header from "../components/Header.js";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import blob2 from "../assets/blob02.png";

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
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="goals">
      <header className="header">
        <Header
          title="Metas"
          subtitle="Hoy es un buen día para plantearte una nueva meta"
        ></Header>
        <img className="uno" src={blob2} alt="uno" />
        <img className="dos" src={blob2} alt="dos" />
      </header>
      <div className="goals__container">
        {/* Div para cada meta */}
        <div className="goals__goal">
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default Goals;
