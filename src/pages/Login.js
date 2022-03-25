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
import blob from "../assets/blob01.png";

// import colors from "../utils/colors";

function Login() {
  return (
    <>
      <header className="header">
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
            <Input placeholder="Correo" />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<LockIcon />} />
            <Input placeholder="Contraseña" type={"password"} />
          </InputGroup>
          <Link color={"primary"}>¿Olvidaste tu contraseña?</Link>
          <Button
            display={"inline-block"}
            backgroundColor="primary"
            textColor="textLight"
          >
            Entrar
          </Button>
        </VStack>
      </div>
    </>
  );
}

export default Login;
