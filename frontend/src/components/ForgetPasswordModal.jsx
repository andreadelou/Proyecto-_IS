import { EmailIcon } from '@chakra-ui/icons'
import { Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { sendResetPasswordEmail } from '../firebase';

function ForgetPasswordModal({
	onOpen,
	onClose,
	isOpen,
	onSuccess,
	sendEmail
}) {
	const [email, setEmail] = useState('');
	
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>¿Olvidaste tu contraseña?</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<InputGroup>
						<InputLeftElement pointerEvents={"none"} children={<EmailIcon />} />
						<Input data-testid="email" id='reset-input' variant={'input'} onChange={($event) => { setEmail($event.target.value) }} placeholder="Tu Correo" type={"emails"} />
					</InputGroup>
				</ModalBody>

				<ModalFooter>
					<Button mr={3} onClick={onClose}>
						Cancelar
					</Button>
					<Button data-testid="sendButton" backgroundColor="primary" textColor="textLight" _hover={{
						backgroundColor: "primary"
					}} onClick={() => {
						sendEmail(email)
					}}>Enviar Correo</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ForgetPasswordModal