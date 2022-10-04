import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import "../CSS/EditButton.css";
import {  useDisclosure } from "@chakra-ui/react";
import {
} from "../services/goals.service";
import GoalModalTwo from "../components/GoalModalTwo";

function EditButton({ onEdit }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
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
