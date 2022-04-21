import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import "../CSS/AddButton.css";

function AddButton() {
  return (
    <button className="add-button">
      <AddIcon />
    </button>
  );
}

export default AddButton;
