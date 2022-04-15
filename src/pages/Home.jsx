import React, { useEffect } from "react";
import { auth, logout } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Image, VStack } from "@chakra-ui/react";
import "../CSS/Home.css";
import Header from "../components/Header.js";
import blob from "../assets/blob01.png";

function Home() {
  const navigate = useNavigate(); // navigate

  // Auth State
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <>
      <header className="header">
        <Header title="Home" subtitle="Revisa tu progreso"></Header>
        <Image
          position={"absolute"}
          right="0"
          top="0"
          className="header__image"
          src={blob}
        />
      </header>

      <VStack align={"flex-start"} gap={"20px"}>
        <div className="points">
          <h1 className="text--bold">140</h1>
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

      {/* <Button onClick={logout}>Logout</Button> */}
    </>
  );
}

export default Home;
