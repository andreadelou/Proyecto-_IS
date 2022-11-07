import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    Button,
    HStack,
    Image,
    useDisclosure,
    VStack,
    Modal,
    useToast,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import "../CSS/Home.css";
import Header from "../components/Header.jsx";
import blob from "../assets/blob01.png";
import { fetchExpiredTasks } from "../services/goals.service.js";
import { proximatarea } from "../services/goals.service";
import { addPointsToUser } from "../services/users.service";

// masacotas          :3
import happyfrog from "../assets/happyfrog.png";
import mehfrog from "../assets/mehfrog.png";
import sadfrog from "../assets/sadfrog.png";
import happyplant from "../assets/happyplant.png";
import mehplant from "../assets/mehplant.png";
import sadplant from "../assets/sadplant.png";
import { getUserInfo,
         setNewPet
        } from "../services/users.service";

//mascotas de armario
import cuadrofondo from "../assets/cuadrofondo.png";
import happybot from "../assets/happybot.png";
import happycloud from "../assets/happycloud.png";
import happydog from "../assets/happydog.png";
import happyflower from "../assets/happyflower.png";
import happyghost from "../assets/happyghost.png";
import happyteddy from "../assets/happyteddy.png";
import happyice from "../assets/happyice.png";
import happyblue from "../assets/happyblue.png";
import happypurple from "../assets/happypurple.png";

import plus from "../assets/plus.png";

import buybutton from "../assets/buybutton.png";
import { againstNullOrUndefined } from "../utils/guard.jsx";
import { User } from "../models/user.js";

function Home() {
    const navigate = useNavigate(); // navigate
    const [title, setTitle] = useState();
    const [reminder, setReminder] = useState();
    const [user, loading] = useAuthState(auth);
    const [points, setPoints] = useState();
    const [pet, setPet] = useState();
    
    const [petState, setPetState] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentModalPage, setCurrentModalPage] = useState("locker");
      // Use the toast
    const toast = useToast();

    const getUserData = async () => {
        const data = await getUserInfo(user); // Get the current user information
        setPoints(data.points ?? 0);
        const puntos = (data.points ?? 0);
        setPet(data.pet);
        return puntos;
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");      
        const getGoalData = async () => {
            const data = await fetchExpiredTasks(); // Fetch the expired goals
            if (data.length > 0) {
                const d = new Date();
                const currentDays = d.getTime() / 1000 / (60 * 60 * 24);
							const goalDays = data[0].reminder.seconds / (60 * 60 * 24);
							
							console.log('Subtract',currentDays - goalDays);
								
							if (Math.floor(currentDays - goalDays) === 1) {
								setPetState(1);
							} else if (Math.floor(currentDays - goalDays) >= 2) {
								
                    setPetState(2);
							} else {
								
                    setPetState(0);
                }
            }
        };
        const getultimameta = async () => {
            const proximameta = await proximatarea();
            setTitle(proximameta[0].title);
            const d = new Date();
            const currentDays = d.getTime() / 1000 / (60 * 60 * 24);
            const goalDays = proximameta[0].reminder.seconds / (60 * 60 * 24);
            setReminder(Math.ceil(goalDays - currentDays));
        };
  
        getUserData();
        getGoalData();
        getultimameta();
        


        

    }, [user, loading]);
    
    const buy = async (petname) => { 
        //funcion que verifica si puede comprar a la mascota que desea
        // comprar la mascota
        const puntos =  await getUserData(); // obitene los puntos del usuario
				const userInfo = await getUserInfo(user)
				if (againstNullOrUndefined(userInfo)) {
					// Create the user instance
					const user = new User(userInfo.uid, userInfo.points, userInfo.active,
					userInfo.configured, userInfo.email, userInfo.name, userInfo.pet, userInfo.pets)
					const successPurchase = user.addPet(pet, 50);
					if (successPurchase) {
						toast({
								title: 'Se logro comprar la mascota',
								description: "Siuuu",
								status: 'success',
								position: 'top',
								duration: 9000,
								isClosable: true,
							});
		
							addPointsToUser(-50, user); //setea los puntos de la mascota
					} else {
						toast({
                title: 'No tienes los puntos suficientes :c',
                description: "Ponte las pilas",
                status: 'error',
                position: 'top',
                duration: 9000,
                isClosable: true,
              });
						}
					
					
				}        
    } 
    
    /**
     * Renders a pet
     */
    const renderPet = () => {
        
        if(pet == "frog"){
            const petArray = [happyfrog, mehfrog, sadfrog];
            return (
                <Image
                    src={petArray[petState]}
                    alt="Rana feliz"
                    width="200px"
                    height="200px"
                />
            );
        }
        else if(pet === "plant"){
            const petArray = [happyplant, mehplant, sadplant];
            return (
                <Image
                    src={petArray[petState]}
                    alt="Rana feliz"
                    width="200px"
                    height="200px"
                />
            );
        }
    };
    return (
        <div className="home">
            <header className="header">
                <Header
                    title="Home"
                    subtitle="Revisa tu progreso"
                    Bandera={true}
                ></Header>
                <Image
                    position={"absolute"}
                    right="0"
                    top="0"
                    className="header__image"
                    src={blob}
                />
            </header>
            <HStack gap={"40"} alignItems={"flex-start"}>
                <VStack align={"flex-start"} gap={"20px"}>
                    <div className="points">
                        <h1 className="text--bold">{points}</h1>
                        <p className="points__text">puntos</p>
                    </div>

                    {title ? (
                        <div className="next-activity">
                            <HStack justifyContent={"space-between"} gap={"20"}>
                                <VStack alignItems={"self-start"}>
                                    <h2 className="next_activity__text">
                                        Proxima tarea:
                                    </h2>
                                    <h2 className="next_activity__text">
                                        {title}
                                    </h2>{" "}
                                    {/* AQUI TENE QUE IR LA TAREAAAAAAAA  */}
                                </VStack>
                                <HStack
                                    alignItems={"baseline"}
                                    className="next-activity__time"
                                >
                                    {reminder < 0 ? (
                                        <h2 className="text">hace</h2>
                                    ) : (
                                        ""
                                    )}
                                    <h2 className="text--bold">
                                        {Math.abs(reminder | 0)}
                                    </h2>
                                    <h2 className="text">días</h2>
                                </HStack>
                            </HStack>
                        </div>
                    ) : (
                        ""
                    )}
                </VStack>
                {/* ONDA DE LA MASCOTA  */}
                <VStack className="mascota">
                    {renderPet()}
                    <Button
                        backgroundColor="primary"
                        textColor="textLight"
                        _hover={{
                            backgroundColor: "primaryLight",
                        }}
                        onClick={onOpen}
                    >
                        Personalizar
                    </Button>
                </VStack>
                {/* FIN DE ONDA DE LA MASCOTA */}
            </HStack>
            {/* ==== STORE MODAL ==== */}
            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Personaliza tu Mascota</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack justifyContent={"space-around"}>
                            <Button
                                borderRadius={100}
                                flex={1}
                                onClick={() => {
                                    setCurrentModalPage("store");
                                }}
                                backgroundColor={
                                    currentModalPage !== "store"
                                        ? "primaryDark"
                                        : "primary"
                                }
                                textColor="textLight"
                                _hover={{
                                    backgroundColor: "primaryLight",
                                }}
                            >
                                Tienda
                            </Button>
                            <Button
                                borderRadius={100}
                                flex={1}
                                backgroundColor={
                                    currentModalPage !== "locker"
                                        ? "primaryDark"
                                        : "primary"
                                }
                                onClick={() => {
                                    setCurrentModalPage("locker");
                                }}
                                textColor="textLight"
                                _hover={{
                                    backgroundColor: "primaryLight",
                                }}
                            >
                                Personajes
                            </Button>

                        </HStack>

                        
                        {currentModalPage === "locker" ? (
                            <>
                                Armario
                                <div
                                    className="personajesArmarioFondo"
                                    style={{
                                        width: "1100px",
                                        height: "700px" /*, backgroundColor: "red"*/,
                                        marginTop: "30px",
                                    }}
                                >
                                    {/*fondos fila1*/}
                                    
                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro1"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "4%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro2"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "37%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro3"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "relative",
                                            left: "70%",
                                            margin: "30px",
                                        }}
                                    />

                                    {/*fondos fila2*/}
                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro4"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "4%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro5"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "37%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro6"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "relative",
                                            left: "70%",
                                            margin: "30px",
                                        }}
                                    />

                                    {/*fondos fila3*/}
                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro4"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "4%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro5"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "37%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro6"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "relative",
                                            left: "70%",
                                            margin: "30px",
                                        }}
                                    />

                                    <div
                                        className="personajesArmario"
                                        style={{
                                            width: "1100px",
                                            height: "700px",
                                            position: "absolute",
                                            marginTop: "30px",
                                        }}
                                    >

                                        {/*imagenes fila1*/}

                                        <button className='c1' onClick={() => {
                                            setPet('plant');
                                            setNewPet('plant',user);
                                        }} 
                                        >
                                        <img
                                        
                                            src={happyplant}
                                            alt="cuadro1"
                                            style={{
                                                width: "200px",
                                                height: "160px",
                                                position: "absolute",
                                                left: "5%",
                                                top: "-100%",
                                            }}
                                        />
                                        </button>


                                        <button className='c1' onClick={() => {
                                            setPet('frog');
                                            setNewPet('frog',user);
                                        }} 
                                        >
                                        <img
                                            src={happyfrog}
                                            alt="cuadro2"
                                            style={{
                                                width: "200px",
                                                height: "170px",
                                                position: "absolute",
                                                left: "40%",
                                                top: "-100%",
                                            }}
                                        />
                                        </button>

                                        <img
                                            src={plus}
                                            alt="cuadro3"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "82%",
                                                top: "-97%",
                                            }}
                                        />

                                        {/*imagenes fila2*/}

                                        <img
                                            src={plus}
                                            alt="cuadro1"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "10%",
                                                top: "-63%",
                                            }}
                                        />

                                        <img
                                            src={plus}
                                            alt="cuadro2"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "45%",
                                                top: "-63%",
                                            }}
                                        />

                                        <img
                                            src={plus}
                                            alt="cuadro3"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "82%",
                                                top: "-63%",
                                            }}
                                        />

                                        {/*imagenes fila3*/}

                                        <img
                                            src={plus}
                                            alt="cuadro1"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "11%",
                                                top: "-30%",
                                            }}
                                        />

                                        <img
                                            src={plus}
                                            alt="cuadro2"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "45%",
                                                top: "-30%",
                                            }}
                                        />

                                        <img
                                            src={plus}
                                            alt="cuadro3"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "82%",
                                                top: "-30%",
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                Tienda
                                <div
                                    className="personajesArmarioFondo"
                                    style={{
                                        width: "1100px",
                                        height: "700px" /*, backgroundColor: "red"*/,
                                        marginTop: "30px",
                                    }}
                                >
                                    {/*fondos fila1*/}
                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro1"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "4%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro2"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "37%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro3"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "relative",
                                            left: "70%",
                                            margin: "30px",
                                        }}
                                    />

                                    {/*fondos fila2*/}
                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro4"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "4%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro5"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "37%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro6"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "relative",
                                            left: "70%",
                                            margin: "30px",
                                        }}
                                    />

                                    {/*fondos fila3*/}
                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro4"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "4%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro5"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "absolute",
                                            left: "37%",
                                        }}
                                    />

                                    <img
                                        src={cuadrofondo}
                                        alt="cuadro6"
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            position: "relative",
                                            left: "70%",
                                            margin: "30px",
                                        }}
                                    />

                                    <div
                                        className="personajesArmario"
                                        style={{
                                            width: "1100px",
                                            height: "700px",
                                            position: "absolute",
                                            marginTop: "30px",
                                        }}
                                    >
                                        {/*imagenes fila1*/}

                                        <img
                                            src={happyflower}
                                            alt="cuadro1"
                                            style={{
                                                width: "130px",
                                                height: "160px",
                                                position: "absolute",
                                                left: "9%",
                                                top: "-100%",
                                            }}
                                        />

                                        <img
                                            src={happyghost}
                                            alt="cuadro2"
                                            style={{
                                                width: "215px",
                                                height: "260px",
                                                position: "absolute",
                                                left: "40%",
                                                top: "-109%",
                                            }}
                                        />

                                        <img
                                            src={happyteddy}
                                            alt="cuadro3"
                                            style={{
                                                width: "210px",
                                                height: "150px",
                                                position: "absolute",
                                                left: "76%",
                                                top: "-100%",
                                            }}
                                        />

                                        {/*imagenes fila2*/}

                                        <img
                                            src={happybot}
                                            alt="cuadro1"
                                            style={{
                                                width: "215px",
                                                height: "180px",
                                                position: "absolute",
                                                left: "5%",
                                                top: "-66%",
                                            }}
                                        />

                                        <img
                                            src={happycloud}
                                            alt="cuadro2"
                                            style={{
                                                width: "220px",
                                                height: "180px",
                                                position: "absolute",
                                                left: "42%",
                                                top: "-70%",
                                            }}
                                        />

                                        <img
                                            src={happydog}
                                            alt="cuadro3"
                                            style={{
                                                width: "190px",
                                                height: "220px",
                                                position: "absolute",
                                                left: "78%",
                                                top: "-70%",
                                            }}
                                        />

                                        {/*imagenes fila3*/}

                                        <img
                                            src={happyice}
                                            alt="cuadro1"
                                            style={{
                                                width: "170px",
                                                height: "200px",
                                                position: "absolute",
                                                left: "9%",
                                                top: "-35%",
                                            }}
                                        />

                                        <img
                                            src={happyblue}
                                            alt="cuadro2"
                                            style={{
                                                width: "220px",
                                                height: "240px",
                                                position: "absolute",
                                                left: "38%",
                                                top: "-36%",
                                            }}
                                        />

                                        <img
                                            src={happypurple}
                                            alt="cuadro3"
                                            style={{
                                                width: "220px",
                                                height: "240px",
                                                position: "absolute",
                                                left: "74%",
                                                top: "-36%",
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="personajesArmarioTexto"
                                        style={{
                                            width: "1100px",
                                            height: "700px",
                                            position: "absolute",
                                            marginTop: "30px",
                                        }}
                                    >
                                        {/*texto fila1*/}

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "5%",
                                                top: "-100%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "40%",
                                                top: "-100%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "76%",
                                                top: "-100%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        {/*texto fila2*/}

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "5%",
                                                top: "-67%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "40%",
                                                top: "-67%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "77%",
                                                top: "-67%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        {/*texto fila3*/}

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: " 5%",
                                                top: "-34%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "40%",
                                                top: "-34%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>

                                        <h3
                                            style={{
                                                position: "absolute",
                                                left: "76%",
                                                top: "-34%",
                                            }}
                                        >
                                            50 puntos
                                        </h3>
                                    </div>

                                    <div
                                        className="botoncompra"
                                        style={{
                                            width: "1100px",
                                            height: "700px",
                                            position: "absolute",
                                            marginTop: "30px",
                                        }}
                                    >
                                        {/*boton fila1*/}

                                        <img
                                            src={buybutton}
                                            alt="cuadro1"
                                            style={{
                                                width: "97px",
                                                height: "97px",
                                                position: "absolute",
                                                left: "18%",
                                                top: "-87%",
                                            }}
                                            onClick={() => buy("flower")}
                                        />

                                        <img
                                            src={buybutton}
                                            alt="cuadro2"
                                            style={{
                                                width: "97px",
                                                height: "97px",
                                                position: "absolute",
                                                left: "54%",
                                                top: "-87%",
                                            }}
                                            onClick={() => buy("ghost")}
                                        />

                                        <img
                                            src={buybutton}
                                            alt="cuadro3"
                                            style={{
                                                width: "97px",
                                                height: "97px",
                                                position: "absolute",
                                                left: "89%",
                                                top: "-87%",
                                            }}
                                            onClick={() => buy("teddy")}
                                        />

                                        {/*boton fila2*/}

                                        <img
                                            src={buybutton}
                                            alt="cuadro1"
                                            style={{
                                                width: "97px",
                                                height: "97px",
                                                position: "absolute",
                                                left: "18%",
                                                top: "-54%",
                                            }}
                                            onClick={() => buy("bot")}
                                        />

                                        <img
                                            src={buybutton}
                                            alt="cuadro2"
                                            style={{
                                                width: "97px",
                                                height: "97px",
                                                position: "absolute",
                                                left: "54%",
                                                top: "-54%",
                                            }}
                                            onClick={() => buy("cloud")}
                                        />

                                        <img
                                            src={buybutton}
                                            alt="cuadro3"
                                            style={{
                                                width: "97px",
                                                height: "97px",
                                                position: "absolute",
                                                left: "89%",
                                                top: "-54%",
                                            }}
                                            onClick={() => buy("dog")}    
                                        />

                                        {/*boton fila3*/}

                                        <img
                                            src={buybutton}
                                            alt="cuadro1"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "18%",
                                                top: "-21%",
                                            }}
                                            onClick={() => buy("ice")}
                                        />

                                        <img
                                            src={buybutton}
                                            alt="cuadro2"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "54%",
                                                top: "-21%",
                                            }}
                                            onClick={() => buy("blue")}
                                        />

                                        <img
                                            src={buybutton}
                                            alt="cuadro3"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                position: "absolute",
                                                left: "89%",
                                                top: "-21%",
                                            }}
                                            onClick={() => buy("purple")}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* ==== STORE MODAL ==== */}
        </div>
    );
}

export default Home;
