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
    
    // const buy = async (petname) => { 
    //     //funcion que verifica si puede comprar a la mascota que desea
    //     // comprar la mascota
    //     const puntos =  await getUserData(); // obitene los puntos del usuario
		// 		const userInfo = await getUserInfo(user)
		// 		if (againstNullOrUndefined(userInfo)) {
		// 			// Create the user instance
		// 			const user = new User(userInfo.uid, userInfo.points, userInfo.active,
		// 			userInfo.configured, userInfo.email, userInfo.name, userInfo.pet, userInfo.pets)
		// 			const successPurchase = user.addPet(pet, 50);
		// 			if (successPurchase) {
		// 				toast({
		// 						title: 'Se logro comprar la mascota',
		// 						description: "Siuuu",
		// 						status: 'success',
		// 						position: 'top',
		// 						duration: 9000,
		// 						isClosable: true,
		// 					});
		
		// 					addPointsToUser(-50, user); //setea los puntos de la mascota
		// 			} else {
		// 				toast({
    //             title: 'No tienes los puntos suficientes :c',
    //             description: "Ponte las pilas",
    //             status: 'error',
    //             position: 'top',
    //             duration: 9000,
    //             isClosable: true,
    //           });
		// 				}
					
					
		// 		}        
    // } 
    
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
                    {/* <Button
                        backgroundColor="primary"
                        textColor="textLight"
                        _hover={{
                            backgroundColor: "primaryLight",
                        }}
                        onClick={onOpen}
                    >
                        Personalizar
                    </Button> */}
                </VStack>
                {/* FIN DE ONDA DE LA MASCOTA */}
            </HStack>
            {/* ==== STORE MODAL ==== */}
            
            {/* ==== STORE MODAL ==== */}
        </div>
    );
}

export default Home;
