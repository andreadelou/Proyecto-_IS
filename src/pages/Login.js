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
  useToast,
  HStack,
  Spinner,
  useDisclosure
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import blob from "../assets/blob01.png";
import { loginWithEmailAndPassword, auth, logout } from '../firebase.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css'
import Header from "../components/Header";
import ForgetPasswordModal from "../components/ForgetPasswordModal";



function Login() {

  // useState hooks
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // Auth State
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate(); // navigate
  const { isOpen, onOpen, onClose } = useDisclosure();  // Modal settings



  // Use the toast
  const toast = useToast();

  // Check for page changes
  useEffect(() => {
    if (loading) return;
    // const signOut = async () => {
    //   await logout();

    // }
    // signOut();
    if (user) return navigate("/home");
  }, [user, loading]);


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



  const onSuccessReset = () => {
    toast({
      title: 'Se te ha enviado un correo para resetear tu contraseña.',
      status: 'success',
      position: 'top',
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <>
      <header className="header">

        <Header title="Que bueno verte de nuevo" subtitle="Ingresa tus credenciales"></Header>
        <Image
          position={"absolute"}
          right="0"
          top="0"
          className="header__image"
          src={blob}
        />
      </header>
      <div className="form">
        <ForgetPasswordModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} onSuccess={onSuccessReset} />
        <VStack spacing={"24px"} width="30%" alignItems={"start"}>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<EmailIcon />} />
            <Input variant={'input'} placeholder="Correo" type={"email"} onChange={($event) => { setEmail($event.target.value) }} />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<LockIcon />} />
            <Input variant={'input'} onChange={($event) => { setPassword($event.target.value) }} placeholder="Contraseña" type={"password"} />
          </InputGroup>
          <Link color={"primary"} onClick={onOpen}>¿Olvidaste tu contraseña?</Link>
          <HStack spacing={"24px"}>
            <Button
              display={"inline-block"}
              backgroundColor="primary"
              textColor="textLight"
              disabled={loading || !email || !password}
              onClick={login}
            >
              Entrar
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

export default Login;
