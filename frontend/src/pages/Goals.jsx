import React, { useEffect, useState } from "react";
import "../CSS/Goals.css";
import Header from "../components/Header.jsx";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import blob2 from "../assets/blob02.png";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  // addTodoToGoal,
  insertGoal,
  // saveGoal,
  updateGoal,
  updateGoalTodo,
  fetchAllGoals,
  fetchAllGoalsAndGroupByCategory,
} from "../services/goals.service";
import GoalModal from "../components/GoalModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { addPointsToUser } from "../services/users.service";

function Goals() {
  const [goals, setGoals] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user,,] = useAuthState(auth);
  const [goalsProgress, setGoalsProgress] = useState({});

	useEffect(() => {
		if (user) {
      fetchGoals();
      fetchAll();
    }
  }, [user]);
  const fetchGoals = async () => {
    await fetchGoalsByCategory();
  };

  const fetchAll = async () => {
    const goals = await fetchAllGoals();
  };

  const fetchGoalsByCategory = async () => {
    const goals = await fetchAllGoalsAndGroupByCategory();

		setGoals(Object.entries(goals));
    for (const goal of Object.values(goals).flat()) {
      calcProgress(goal); // Calculate the progress for the specific giak,
    }
  };

  /**
   * Add a todo
   * @param {*} goalId
   */
	const addTodo = async (goalId) => {
		console.log('adding todo!!!')
    let updatedGoal = {};
    const newGoals = goals.map((entries) => {
      entries[1].map((goal) => {
        if (goal.id === goalId) {
          goal.todos.push({
            value: "",
            completed: false,
          });
          updatedGoal = goal;
        }
        calcProgress(goal); // Update the progress of the goal
        return goal;
      });
      return entries;
    });
    setGoals(newGoals);
    updateGoal(goalId, updatedGoal);
  };

  const addEdit = async (goal, goalId) => {
    await updateGoal(goalId, goal); // Updates the goal
    await fetchGoals();
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
  };

  /**
   * Mark a todo as completed
   * @param {*} goalId
   * @param {*} index
   * @param {*} todo
   */
  const updateTodoCompleted = (goal, index, todo) => {
    todo.completed = !todo.completed;
    // Calculate total of completed goals
    calcProgress(goal);
    updateGoalTodo(goal, index, todo);
  };

  /**
   * Calculates the progress of a goal
   * @param {*} goal
   * @returns
   */
  const calcProgress = (goal) => {
    const total = goal.todos.reduce((prev, curr) => {
      if (curr.completed) {
        return (prev = prev + 1);
      }
      return prev;
    }, 0);
    // Calculate the percentage
    const progress = (total * 100) / goal.todos.length;
    goal.progress = progress;
    setGoalsProgress({
      ...goalsProgress,
      [goal.id]: goal.progress,
    });
    return goal;
  };

  /**
   * Create a new goal
   * @param {*} title
   * @param {*} category
   */
	const createNewGoal = async (title, category, reminder, description) => {
    await insertGoal(title, category, reminder, description);
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
    if (goal.completed) {
      addPointsToUser(10, user);
    }
  };

  const renderSwitch = (param) => {
    if (param == "exercise") {
      return <div className="colorR"></div>;
    } else if (param == "learn") {
      return <div className="colorA"></div>;
    } else if (param == "health") {
      return <div className="colorC"></div>;
    } else if (param == "mentalhealth") {
      return <div className="colorM"></div>;
    }
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
						role="button"
						name="createGoalButton"
            marginBottom={10}
            onClick={onOpen}
          >
            Nueva Meta
          </Button>
          {/* Div para cada meta */}
          <div className="goals__goal">
            {goals.map((entries) => (
              <div key={entries[0]}>
								<h2>{entries[0]}</h2>
								
                <div>{renderSwitch(entries[0])}</div>

                {entries[1].map((goal) => (
                  <div key={goal.id}>
                    <TodoForm
                      addTodo={addTodo}
                      percentage={Math.max(
                        goal.progress,
                        goalsProgress[goal.id]
                      )}
                      completed={goal.completed}
                      onToggleCompleted={() => {
                        updateGoalCompleted(goal, goal.id);
											}}
											description = {goal.description}
                      onAdd={() => {
                        addTodo(goal.id);
                      }}
                      onEdit={(newTitle) => {
                        addEdit({ title: newTitle }, goal.id);
                        //console.log(newTitle);
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
            ))}
          </div>
        </div>
      </div>
      <GoalModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
				onSave={(title, category, reminder, description) => {
          createNewGoal(title, category, reminder, description);
        }}
      />
    </>
  );
}

export default Goals;
