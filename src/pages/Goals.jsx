import React, { useEffect, useState } from "react";
import "../CSS/Goals.css";
import Header from "../components/Header.js";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import blob2 from "../assets/blob02.png";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  addPoints,
  // addTodoToGoal,
  insertGoal,
  // saveGoal,
  updateGoal,
  updateGoalTodo,
  fetchAllGoals,
} from "../services/goals.service";
import GoalModal from "../components/GoalModal";

function Goals() {
  const [goals, setGoals] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchGoals();
  }, []);
  const fetchGoals = async () => {
    const goals = await fetchAllGoals();
    setGoals(goals);
  };

  /**
   * Add a todo
   * @param {*} goalId
   */
  const addTodo = async (goalId) => {
    let updatedGoal = {};
    const newGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        goal.todos.push({
          value: "",
          completed: false,
        });
        updatedGoal = goal;
      }
      return goal;
    });
    setGoals(newGoals);
    updateGoal(goalId, updatedGoal);
  };

  /**
   * Update a todo
   * @param {*} goalId
   * @param {*} index
   * @param {*} todo
   * @param {*} value
   */
  const updateTodo = (goal, index, todo, value) => {
    todo.value = value;
    updateGoalTodo(goal, index, todo);
    fetchGoals();
  };

  /**
   * Mark a todo as completed
   * @param {*} goalId
   * @param {*} index
   * @param {*} todo
   */
  const updateTodoCompleted = (goal, index, todo) => {
    todo.completed = !todo.completed;
    updateGoalTodo(goal, index, todo);
    fetchGoals();
  };

  /**
   * Create a new goal
   * @param {*} title
   * @param {*} category
   */
  const createNewGoal = async (title, category) => {
    await insertGoal(title, category);
    fetchGoals();
  };

  /**
   * Updates a goal as completed
   * @param {*} goal
   * @param {*} goalId
   */
  const updateGoalCompleted = async (goal, goalId) => {
    goal.completed = !goal.completed;
    await updateGoal(goalId, goal); // Updates the goal
    addPoints(10);
    fetchGoals();
  };

  return (
    <>
      <div className="goals">
        <header className="header">
          <Header
            title="Metas"
            subtitle="Hoy es un buen día para plantearte una nueva meta"
            Bandera={true}
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
            {goals
              .filter((goal) => !goal.completed)
              .map((goal) => (
                <div key={goal.id}>
                  <TodoForm
                    addTodo={addTodo}
                    completed={goal.completed}
                    onToggleCompleted={() => {
                      updateGoalCompleted(goal, goal.id);
                    }}
                    onAdd={() => {
                      addTodo(goal.id);
                    }}
                    title={goal.title}
                  />
                  <TodoList
                    todos={goal.todos}
                    toggleComplete={(todoIndex, todo) => {
                      updateTodoCompleted(goal, todoIndex, todo);
                    }}
                    onTodoChange={(todoIndex, todo, value) => {
                      updateTodo(goal, todoIndex, todo, value);
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
