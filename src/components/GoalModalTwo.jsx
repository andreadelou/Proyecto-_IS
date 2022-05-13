import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendar, FaUserCircle } from "react-icons/fa"
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

function GoalModal({ isOpen, onClose, onOpen, onSave }) {
  const [reminder, setreminder] = useState(null);
  const [goalTitle, setGoalTitle] = useState(null);
  const [goalCategory, setGoalCategory] = useState(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nueva Meta</ModalHeader>
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
            textColor="textLight"
            _hover={{
              backgroundColor: "primaryLight",
            }}
            onClick={() => {
              onClose();
              setGoalTitle(null);
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

export default GoalModal;
