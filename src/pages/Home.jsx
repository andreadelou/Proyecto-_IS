import React, { useEffect, useState } from "react";
import { auth, logout } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Image, VStack } from "@chakra-ui/react";
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

  const [user, loading, error] = useAuthState(auth);
  const [title, settitle] = useState();
  const [points, setPoints] = useState();
  const [pet, setPet] = useState();
  const [petState, setPetState] = useState(0);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    const getUserData = async () => {
      const data = await getUserInfo(user); // Get the current user information
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
    if (user) {
      getUserData();
      getGoalData();
    }
    setPoints(getPoints());
  }, [user, loading]);

  // settitle(proximatarea());
  // }, [user, title]);

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

          <div className="next-activity">
            <HStack justifyContent={"space-between"} gap={"20"}>
              <VStack alignItems={"self-start"}>
                <h2 className="next_activity__text">Proxima tarea:</h2>
                <h2 className="next_activity__text">{title}</h2>{" "}
                {/* AQUI TENE QUE IR LA TAREAAAAAAAA  */}
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
