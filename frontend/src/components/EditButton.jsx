import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import "../CSS/EditButton.css";
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
import GoalModalTwo from "../components/GoalModalTwo";
import { useAuthState } from "react-firebase-hooks/auth";
import { loginWithEmailAndPassword, auth, logout } from "../firebase.js";

function EditButton({ onEdit }) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateGoalCompleted = async (goal, goalId) => {
    await updateGoal(goalId, goal); // Updates the goal
  };

  return (
    <><button data-testid="oneditButton"  className="edit-button" onClick={onOpen}>
      <EditIcon />
    </button>
    <GoalModalTwo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose} 
        onSave={onEdit}
        />
        
        
        </>
  
  );
  
    
}

export default EditButton;
