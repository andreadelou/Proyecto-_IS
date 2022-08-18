import React, { useEffect, useState } from "react";
import { auth, logout } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Image, useDisclosure, VStack, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from "@chakra-ui/react";
import "../CSS/Home.css";
import Header from "../components/Header.js";
import blob from "../assets/blob01.png";
import { fetchExpiredTasks, getPoints } from "../services/goals.service.js";
import { proximatarea } from "../services/goals.service";

// masacotas          :3
import happyfrog from "../assets/happyfrog.png";
import mehfrog from "../assets/mehfrog.png";
import sadfrog from "../assets/sadfrog.png";
import happyplant from "../assets/happyplant.png";
import mehplant from "../assets/mehplant.png";
import sadplant from "../assets/sadplant.png";
import { getUserInfo } from "../services/users.service.js";


function Home() {
  const navigate = useNavigate(); // navigate
  const [title, setTitle] = useState();
  const [reminder, setReminder] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [points, setPoints] = useState();
  const [pet, setPet] = useState();
	const [petState, setPetState] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [currentModalPage, setCurrentModalPage] = useState("locker");
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    const getUserData = async () => {
      const data = await getUserInfo(user); // Get the current user information
      setPoints(data.points ?? 0);
      setPet(data.pet);
    };
    const getGoalData = async () => {
      const data = await fetchExpiredTasks(); // Fetch the expired goals
      if (data.length > 0) {
        const d = new Date();
        const currentDays = d.getTime() / 1000 / (60 * 60 * 24);
        const goalDays = data[0].reminder.seconds / (60 * 60 * 24);

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
    if (user) {
      getUserData();
      getGoalData();
      getultimameta();
    }
  }, [user, loading]);

  /**
   * Renders a pet
   */
  const renderPet = () => {
    if (pet !== "frog" && pet !== "plant") return; // Do not render if pet is not present
    const petArray =
      pet === "frog"
        ? [happyfrog, mehfrog, sadfrog]
        : [happyplant, mehplant, sadplant];
    return (
      <Image
        src={petArray[petState]}
        alt="Rana feliz"
        width="200px"
        height="200px"
      />
    );
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
                  <h2 className="next_activity__text">Proxima tarea:</h2>
                  <h2 className="next_activity__text">{title}</h2>{" "}
                  {/* AQUI TENE QUE IR LA TAREAAAAAAAA  */}
                </VStack>
                <HStack alignItems={"baseline"} className="next-activity__time">
                  {reminder < 0 ? <h2 className="text">hace</h2> : ""}
                  <h2 className="text--bold">{Math.abs(reminder | 0)}</h2>
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
					>Personalizar</Button>
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
								onClick={() => {setCurrentModalPage("store")}}
								backgroundColor={currentModalPage !== "store" ? "primaryDark" : "primary"}
								textColor="textLight"
								_hover={{
									backgroundColor: "primaryLight",
								}}
							>Tienda</Button>
							<Button borderRadius={100} flex={1}
								backgroundColor={currentModalPage !== "locker" ? "primaryDark" : "primary"}
								onClick={() => {setCurrentModalPage("locker")}}
            		textColor="textLight"
            		_hover={{
              		backgroundColor: "primaryLight",
								}}>Personajes</Button>
						</HStack>
						{ currentModalPage === "locker" ?
							<>
								Armario
							</> :
							<>
								Tienda
							</>
						}
          </ModalBody>
        </ModalContent>
			</Modal>
			{/* ==== STORE MODAL ==== */}
    </div>
  );
}

export default Home;
