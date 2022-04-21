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
import rana from "../assets/rana.png";
import planta from "../assets/planta.png";
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
        <Image
          position={"absolute"}
          right="0"
          top="0"
          className="header__image"
          src={blob}
        /></header>
        <span className='subtitulos'>Escoge tus metas para comenzar</span>
        <p></p>
        <span className='subtitulos'>Elige como minimo dos</span>
        

        <button className='botonesnow' ><img src={trotar} height ="40" width="60" />Ejercicio </button>
        <button className='botonesnow' ><img src={meditar} height ="40" width="60" />Meditar </button>
        <button className='botonesnow' ><img src={leer} height ="40" width="60" />Leer </button>
        <button className='botonesnow' ><img src={medicina} height ="40" width="60" />Medicina </button>

      <p></p>

        <span className='subtitulos'>Escoge tu nueva mascota</span>
        <button className='botonesnow' ><img src={rana} height ="40" width="60" /> </button>
        <button className='botonesnow' ><img src={planta} height ="40" width="60" /> </button>
            
      



        </div>
    )
}

export default Welcome