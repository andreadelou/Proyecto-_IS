import React, { useEffect } from 'react';
import { auth, logout } from '../firebase.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import blob from "../assets/blob01.png";
import Header from "../components/Header";
import "../CSS/Hom.css"
import {
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
    Spinner
  } from "@chakra-ui/react";

function Welcome() {
    const navigate = useNavigate(); // navigate

    // Auth State
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);
    return (
        <div className='pagina'>
        <header><Button className='botones' onClick={logout}>Logout</Button>
        <Header title="Bienvenidx" ></Header>
        <Image
          position={"absolute"}
          right="0"
          top="0"
          className="header__image"
          src={blob}
        /></header>
            
        </div>
    )
}

export default Welcome