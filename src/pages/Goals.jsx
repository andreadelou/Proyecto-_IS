import React, { useEffect, useState } from "react";
import "../CSS/Goals.css";
import Header from "../components/Header.js";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import blob2 from "../assets/blob02.png";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  addTodoToGoal,
  getAllGoals,
  saveGoal,
  updateGoalTodo,
} from "../services/goals.service";
import GoalModal from "../components/GoalModal";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function Goals() {
  const [goals, setGoals] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setGoals(getAllGoals());
  }, []);

  /**
   * Add a todo
   * @param {*} goalId
   */
  const addTodo = (goalId) => {
    addTodoToGoal(goalId);
    setGoals(getAllGoals());
  };

  /**
   * Update a todo
   * @param {*} goalId
   * @param {*} index
   * @param {*} todo
   * @param {*} value
   */
  const updateTodo = (goalId, index, todo, value) => {
    todo.value = value;
    updateGoalTodo(goalId, index, todo);
    setGoals(getAllGoals());
  };

  /**
   * Mark a todo as completed
   * @param {*} goalId
   * @param {*} index
   * @param {*} todo
   */
  const updateTodoCompleted = (goalId, index, todo) => {
    todo.completed = !todo.completed;
    updateGoalTodo(goalId, index, todo);
    setGoals(getAllGoals());
  };

  /**
   * Create a new goal
   * @param {*} title
   * @param {*} category
   */
  const createNewGoal = (title, category) => {
    saveGoal(title, category);
    setGoals(getAllGoals());
  };

  return (
    <>
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
          <Button
            backgroundColor="primary"
            textColor="textLight"
            _hover={{
              backgroundColor: "primaryLight",
            }}
            marginBottom={10}
            onClick={onOpen}
          >
            Nueva Meta
          </Button>
          {/* Div para cada meta */}
          <div className="goals__goal">
            {goals.map((goal) => (
              <div key={goal.id}>
                <TodoForm
                  addTodo={addTodo}
                  completed={goal.completed}
                  onAdd={() => {
                    addTodo(goal.id);
                  }}
                  title={goal.title}
                />
                <TodoList
                  todos={goal.todos}
                  toggleComplete={(todoIndex, todo) => {
                    updateTodoCompleted(goal.id, todoIndex, todo);
                  }}
                  onTodoChange={(todoIndex, todo, value) => {
                    updateTodo(goal.id, todoIndex, todo, value);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <GoalModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onSave={(title, category) => {
          createNewGoal(title, category);
        }}
      />
    </>
  );
}

export default Goals;
