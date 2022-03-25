import React from "react";
import {
    Button,
    Flex,
    Heading,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    VStack,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa"
import blob from "../assets/blob01.png";

// import colors from "../utils/colors";

function Register() {
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
                        <Input placeholder="Nombres" />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<FaUserCircle />} />
                        <Input placeholder="Apellidos" />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<EmailIcon />} />
                        <Input placeholder="Correo" type={"email"} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"} children={<LockIcon />} />
                        <Input placeholder="Contraseña" type={"password"} />
                    </InputGroup>

                    <Button
                        display={"inline-block"}
                        backgroundColor="primary"
                        textColor="textLight"
                    >
                        Crear Cuenta
                    </Button>
                </VStack>
            </div>
        </>
    );
}

export default Register;
