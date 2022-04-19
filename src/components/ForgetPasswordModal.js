import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

function ForgetPasswordModal({
    onOpen,
    onClose,
    isOpen
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    32432
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button backgroundColor="primary" textColor="textLight" _hover={{
                        backgroundColor: "primary"
                    }}>Enviar Correo</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ForgetPasswordModal