import React, { useEffect, useState } from "react";
import {
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Spinner,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa"
import { registerWithEmailAndPassword, auth } from '../firebase.js';

import blob from "../assets/blob01.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";



function Register() {

    // useState hooks
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password1, setPassword1] = useState();

    // Auth State
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate(); // navigate

    useEffect(() => {
        if (loading) return;
        if (user) return navigate("/home");
    }, [user, loading]);


    // Use the toast
    const toast = useToast();
    /**
     * Register the user into the application
     */
    const register = async () => {

        const success = await registerWithEmailAndPassword(name, email, password);
        // Show alert depending on the situation
        if (success) {
            toast({
                title: 'Se ha creado tu cuenta.',
                status: 'success',
                position: 'top',
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Hubo un error al crear tu cuenta.',
                description: "Revisa que todos los campos estén correctos.",
                status: 'error',
                position: 'top',
                duration: 9000,
                isClosable: true,
            });
        }

    }

    return (
        <>
            <header className="header">
                <VStack spacing={"38px"} alignItems={"start"}>
                    <Heading as={"h1"} fontWeight={"light"}>
                        Hola, crea tu cuenta
                    </Heading>
                    <Heading as={"h2"} size={"m"}>
                        Estas a un paso de cambiar tu vida
                    </Heading>
                </VStack>
                <Image
                    position={"absolute"}
                    right="0"
                    top="-10"
                    className="header__image"
                    src={blob}
                />
            </header>
            <div className="form">
                <VStack spacing={"24px"} width="30%" alignItems={"start"}>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<FaUserCircle />} />
                        <Input placeholder="Nombre" onChange={($event) => { setName($event.target.value) }} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<EmailIcon />} />
                        <Input onChange={($event) => { setEmail($event.target.value) }} placeholder="Correo" type={"email"} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<LockIcon />} />
                        <Input placeholder="Contraseña" onChange={($event) => { setPassword($event.target.value) }} type={"password"} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<LockIcon />} />
                        <Input placeholder="Repite tu Contraseña" onChange={($event) => { setPassword1($event.target.value) }} type={"password"} />
                    </InputGroup>

                    <HStack spacing={24}>
                        <Button
                            display={"inline-block"}
                            backgroundColor="primary"
                            textColor="textLight"
                            onClick={register}
                            disabled={loading || password1 !== password || !password || !password1 || !name || !email}
                        >
                            Crear Cuenta
                        </Button>
                        {
                            loading ? <Spinner size='md' color={"textDark"} /> : ''
                        }

                    </HStack>

                </VStack>
            </div>
        </>
    );
}

export default Register;
