import { v4 as uuid, v4 } from "uuid";
import { auth, db } from '../firebase'
import { collection, addDoc, Timestamp, getDocs, updateDoc, doc, query, where, limit, orderBy } from 'firebase/firestore'

const LOCAL_STORAGE_KEY = "goals";

let goals = JSON.parse(localStorage.getItem('goals')) ?? [];
/**
 * Get all goals from the user
 */
export const getAllGoals = () => {
    // await insertGoal();
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
 * Add points
 */
export const addPoints = (quantiy) => {
    let currentPoints = Number(localStorage.getItem('points')) ?? 0;
    localStorage.setItem('points', currentPoints + quantiy)
}


/**
 * Get the points
 * @returns {Number}
 */
export const getPoints = () => {
    return Number(localStorage.getItem('points')) ?? 0;
}



/**
 * Update a todo
 * @param {*} goalId 
 * @param {*} todoIndex 
 * @param {*} updatedTodo 
 */
export const updateGoalTodo = async (goal, todoIndex, updatedTodo) => {
    goal.todos[todoIndex] = updatedTodo;
    await updateGoal(goal.id, goal);
}

/**
 * Updates a Goal
 * @param {*} goalId 
 * @param {*} goal 
 */
export const updateGoal = async (goalId, updatedGoal) => {
    const docRef = doc(db, 'goals', goalId);    // Get the document reference from firebase
    await updateDoc(docRef, updatedGoal);   // Update the document
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

/**
 * Insert a goal in firestore.
 */
export const insertGoal = async (title, category, reminder = '') => {
    const uid = auth.currentUser.uid;
    await addDoc(collection(db, 'goals'), {
        title,
        category,
        reminder,
        completed: false,
        uid,
        createdAt: (new Date()).toISOString(),
        todos: [

        ],
        progress: 0
    });
}

/**
 * Fetch all goals on the database
 * @returns {[]}
 */
export const fetchAllGoals = async () => {
    const uid = auth.currentUser.uid;

    const goalsCol = collection(db, 'goals');
    const q = query(goalsCol, where("uid", "==", uid))
    const goalsSnapshot = await getDocs(q);
    return goalsSnapshot.docs.map(d => {
        return {
            id: d.id,
            ...d.data(),
        }
    }) ?? [];
}

/**
 * Fetch most recent goals
 */
export const fetchExpiredTasks = async () => {
    const uid = auth.currentUser.uid;

    const goalsCol = collection(db, 'goals');
    const q = query(goalsCol, where("uid", "==", uid), where('completed', "==", false), orderBy('reminder', 'asc'), limit(1))
    const goalsSnapshot = await getDocs(q);
    return goalsSnapshot.docs.map(d => {
        return {
            id: d.id,
            ...d.data(),
        }
    }) ?? [];

}

export const fetchAllGoalsAndGroupByCategory = async () => {
    const uid = auth.currentUser.uid;
    const goalsCol = collection(db, 'goals');
    const q = query(goalsCol, where("uid", "==", uid))
    const goalsSnapshot = await getDocs(q);
    const goals = {};
    for (const goal of goalsSnapshot.docs.filter(goal => !goal.data().completed).map(goal => {
        return {
            id: goal.id,
            ...goal.data()
        }
    })) {
        if (!goals[goal.category]) {
            goals[goal.category] = [goal];
        } else {
            goals[goal.category].push(goal);
        }
    }

    return goals;   // Return the grouped goals
}