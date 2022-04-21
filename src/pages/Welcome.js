import React, { useEffect } from 'react';
import { auth, logout } from '../firebase.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import medicina from "../assets/droga-de-la-medicina.png";
import leer from "../assets/leer.png";
import meditar from "../assets/meditacion.png";
import trotar from "../assets/trotar.png";
import blob from "../assets/blob01.png";
import Header from "../components/Header";
import "../CSS/welcome.css"
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
        <header>
        <Header title="Bienvenidx" ></Header>
        <span className='subtitulos'>Escoge tus metas para comenzar</span>
        <p></p>
        <span className='subtitulos'>Elige como minimo dos</span>
        <Image
          position={"absolute"}
          right="0"
          top="0"
          className="header__image"
          src={blob}
        /></header>

        <button className='botonesnow' ><img src={trotar} height ="40" width="60" />Ejercicio </button>
        <button className='botonesnow' ><img src={meditar} height ="40" width="60" />Meditar </button>
        <button className='botonesnow' ><img src={leer} height ="40" width="60" />Leer </button>
        <button className='botonesnow' ><img src={medicina} height ="40" width="60" />Medicina </button>
            
        </div>
    )
}

export default Welcome