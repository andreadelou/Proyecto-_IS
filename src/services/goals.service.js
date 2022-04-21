

let goals = [{
    id: 1,
    completed: true,
    title: 'Meta de ejemplo',
    todos: [

    ]
}];

/**
 * Get all goals from the user
 */
export const getAllGoals = () => {
    return goals
}



/**
 * Creates a goal
 * @param {*} goal 
 */
export const createGoal = (goal) => {

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

    })
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
    })
}

/**
 * Create a new goal
 * @param {*} title 
 * @param {*} category 
 */
export const saveGoal = (title, category) => {
    goals.push({
        id: Math.random(),
        completed: false,
        title,
        category,
        todos: [

        ]
    })
}