import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendar, FaUserCircle } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { getAllGoals, updateGoal } from "../services/goals.service";

function GoalModalTwo({ isOpen, onClose, onOpen, onSave }) {
  const [reminder, setreminder] = useState(null);
  const [goalTitle, setGoalTitle] = useState(null);
  const [goalCategory, setGoalCategory] = useState(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Meta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              marginBottom={2}
              placeholder="Título de tu meta"
              onChange={($event) => {
                setGoalTitle($event.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
						backgroundColor="primary"
						data-testid="goalSaveButton"
            textColor="textLight"
            _hover={{
              backgroundColor: "primaryLight",
            }}
            onClick={() => {
              onClose();
              setGoalTitle(null);
              /*console.log(getAllGoals());
              updateGoal("4IKlDxrit783GIPQDJJ9",{title: "otronombre"});*/
              onSave(goalTitle);
            }}
            disabled={!goalTitle}
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GoalModalTwo;
