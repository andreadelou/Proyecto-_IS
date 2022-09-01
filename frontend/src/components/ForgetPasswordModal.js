import { EmailIcon } from '@chakra-ui/icons'
import { Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { sendResetPasswordEmail } from '../firebase';

function ForgetPasswordModal({
    onOpen,
    onClose,
    isOpen,
    onSuccess
}) {
    const [email, setEmail] = useState('');
    const sendEmail = async () => {
        const success = await sendResetPasswordEmail(email);
        if (success) {
            onSuccess();
            onClose();
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>¿Olvidaste tu contraseña?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<EmailIcon />} />
                        <Input variant={'input'} onChange={($event) => { setEmail($event.target.value) }} placeholder="Correo" type={"emails"} />
                    </InputGroup>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button backgroundColor="primary" textColor="textLight" _hover={{
                        backgroundColor: "primary"
                    }} disabled={email.length <= 0} onClick={sendEmail}>Enviar Correo</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ForgetPasswordModal