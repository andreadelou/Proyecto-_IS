import React, { useEffect, useState } from "react";
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
  useToast
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import blob from "../assets/blob01.png";
import { loginWithEmailAndPassword, auth, logout } from '../firebase.js';
import { useAuthState } from "react-firebase-hooks/auth";



function Login() {

  // useState hooks
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // Auth State
  const [user, loading, error] = useAuthState(auth);


  // Use the toast
  const toast = useToast();

  /**
   * Login the user on the application
   */
  const login = async () => {
    const success = await loginWithEmailAndPassword(email, password); // Wait for the success response
    // Show alert depending on the situation
    if (success) {
      toast({
        title: 'Has ingresado exitosamente.',
        status: 'success',
        position: 'top',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Credenciales Incorrectas.',
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
        <p>Usuario: {user ? Object.values(user).toString() : ""}</p>
        <VStack spacing={"38px"} alignItems={"start"}>
          <Heading as={"h1"} fontWeight={"light"}>
            Que bueno verte de nuevo
          </Heading>
          <Heading as={"h2"} size={"m"}>
            Ingresa tus credenciales
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
            <InputLeftElement pointerEvents={"none"} children={<EmailIcon />} />
            <Input placeholder="Correo" type={"email"} onChange={($event) => { setEmail($event.target.value) }} />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<LockIcon />} />
            <Input onChange={($event) => { setPassword($event.target.value) }} placeholder="Contraseña" type={"password"} />
          </InputGroup>
          <Link color={"primary"}>¿Olvidaste tu contraseña?</Link>
          <Button
            display={"inline-block"}
            backgroundColor="primary"
            textColor="textLight"
            disabled={!email || !password}
            onClick={login}
          >
            Entrar
          </Button>
        </VStack>
      </div>
    </>
  );
}

export default Login;
