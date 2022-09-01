import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import "../CSS/AddButton.css";

function AddButton({ onAdd }) {
  return (
    <button className="add-button" onClick={onAdd}>
      <AddIcon />
    </button>
  );
}

export default AddButton;
