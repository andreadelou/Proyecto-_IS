import { v4 as uuid, v4 } from "uuid";

const LOCAL_STORAGE_KEY = "goals";

let goals = JSON.parse(localStorage.getItem('goals')) ?? [];
/**
 * Get all goals from the user
 */
export const getAllGoals = () => {
    return goals;
}


/**
 * Save Goals in local storage
 */
export const saveGoalsInLocal = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goals))
}
/*Eliminar una goal*/
export const deleteGoal = (goalId) => {
    goals = goals.map((goal) => {
        if (goal.id === goalId) {
            localStorage.removeItem(LOCAL_STORAGE_KEY, JSON.stringify(goals))
        }
    });
}


/**
 * Add a todo to a specific goal
 * @param {*} id 
 */
export const addTodoToGoal = (id) => {
    goals = goals.map(goal => {
        if (goal.id === id) {
            if (goal.todos.length > 0 && goal.todos[goal.todos.length - 1].value === "") {
                return goal;
            }
            return {
                ...goal,
                todos: [...goal.todos, { value: '', completed: false }]
            }
        }
        return goal;
    });
    saveGoalsInLocal();
};

/**
 * Update a todo
 * @param {*} goalId 
 * @param {*} todoIndex 
 * @param {*} updatedTodo 
 */
export const updateGoalTodo = (goalId, todoIndex, updatedTodo) => {
    goals = goals.map((goal) => {
        if (goal.id === goalId) {
            return {
                ...goal,
                todos: goal.todos.map((todo, index) => {
                    if (index === todoIndex) {
                        todo = updatedTodo;
                    }
                    return todo;
                })
            }
        }
        return goal;
    });
    saveGoalsInLocal();
}

/**
 * Updates a Goal
 * @param {*} goalId 
 * @param {*} goal 
 */
export const updateGoal = (goalId, updatedGoal) => {
    goals = goals.map((goal) => {
        if (goal.id === goalId) {
            goal = updatedGoal;
        }
        return goal;
    });
    saveGoalsInLocal();
}

/**
 * Create a new goal
 * @param {*} title 
 * @param {*} category 
 */
export const saveGoal = (title, category) => {
    goals.push({
        id: v4(),
        completed: false,
        title,
        category,
        todos: [

        ]
    });
    saveGoalsInLocal();
}