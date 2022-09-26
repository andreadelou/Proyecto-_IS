import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
	Text,
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

function GoalModal({ isOpen, onClose, onOpen, onSave }) {
  const [reminder, setreminder] = useState(null);
  const [goalTitle, setGoalTitle] = useState(null);
  const [goalDescription, setGoalDescription] = useState(null);
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
							data-testid="title"
              marginBottom={2}
              placeholder="Título de tu meta"
              onChange={($event) => {
                setGoalTitle($event.target.value);
              }}
            />
					</FormControl>
					<FormControl>
						<Input
							data-testid="description"
              marginBottom={2}
              placeholder="Descripción de tu meta"
              onChange={($event) => {
                setGoalDescription($event.target.value);
              }}
            />
          </FormControl>
          <FormControl marginBottom={2}>
						<Select
							data-testid="category"
              marginBottom={2}
              placeholder="Selecciona una categoría"
              onChange={($event) => {
                setGoalCategory($event.target.value);
              }}
            >
              <option value="health">Salud</option>
              <option value="exercise">Ejercicio</option>
              <option value="learn">Aprendizaje</option>
              <option value="mentalhealth">Salud Mental</option>
            </Select>
          </FormControl>
          <FormControl>
            <DatePicker
              popperPlacement={"right"}
              customInput={
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<FaCalendar />}
                  />
									<Input
										data-testid="reminder"
                    placeholder="Recordatorio"
                    readOnly={true}
                    value={reminder ? reminder.toLocaleDateString("en-US") : ""}
                  />
                </InputGroup>
              }
              selected={reminder}
              onChange={(date) => {
                setreminder(date);
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
							setGoalCategory(null);
							setGoalDescription(null);
              setreminder(null);
              onSave(goalTitle, goalCategory, reminder);
						}}
						data-testid="save"
            disabled={!goalTitle || !goalCategory || !reminder}
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GoalModal;
