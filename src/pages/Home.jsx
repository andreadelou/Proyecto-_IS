import React, { useEffect, useState } from "react";
import { auth, logout } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Image, VStack } from "@chakra-ui/react";
import "../CSS/Home.css";
import Header from "../components/Header.js";
import blob from "../assets/blob01.png";
import { getPoints } from "../services/goals.service.js";

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

  // Auth State
  const [user, loading, error] = useAuthState(auth);
  const [points, setPoints] = useState();
  const [pet, setPet] = useState();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    const getUserData = async () => {
      const data = await getUserInfo(user); // Get the current user information
      setPet(data.pet);
    };
    if (user) {
      getUserData();
    }
    setPoints(getPoints());
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
      <Image src={petArray[0]} alt="Rana feliz" width="200px" height="200px" />
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

          <div className="next-activity">
            <HStack justifyContent={"space-between"} gap={"20"}>
              <VStack alignItems={"self-start"}>
                <h2 className="next_activity__text">Proxima tarea:</h2>
                <h2 className="next_activity__text">Meditar</h2>
              </VStack>
              <HStack alignItems={"baseline"} className="next-activity__time">
                <h2 className="text--bold">3</h2>
                <h2 className="text">días</h2>
              </HStack>
            </HStack>
          </div>
        </VStack>
        {/* ONDA DE LA MASCOTA  */}

        <div className="mascota">
          {/* <h1>
            Mascota
          </h1> */}
          {renderPet()}
        </div>
        {/* FIN DE ONDA DE LA MASCOTA */}
      </HStack>
      {/* <Button onClick={logout}>Logout</Button> */}
    </div>
  );
}

export default Home;
