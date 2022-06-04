import React from "react";
import Header from "../components/Header";
import "../CSS/Health.css";
/*import {
  fetchAllGoals,
  fetchAllGoalsAndGroupByCategory,
} from "../services/goals.service";*/
import GoalModal from "../components/GoalModal";

//importando imagen
import blob2 from "../assets/blob02.png";

//import ProgressBar from "../components/ProgressBar.jsx";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";


import { useEffect, useState } from "react";

import {Pie} from "../components/PiCharts";

function Health() {

 /* const [user, loading, error] = useAuthState(auth);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchGoals();
    }
  }, [user]);
  const fetchGoals = async () => {
    await fetchGoalsByCategory();
  };
  const fetchGoalsByCategory = async () => {
    const goals = await fetchAllGoalsAndGroupByCategory();
    setGoals(Object.entries(goals));
    for (const goal of Object.values(goals).flat()) {
      calcProgress(goal); // Calculate the progress for the specific giak,
    }
  };
*/
  



  return (
    <div className="health">

      <header className="header">
        <Header title="Bienestar" subtitle="Estadísticas de tus metas" Bandera={true}></Header>
        <img className="uno" src="" alt="uno" />
        <img className="dos" src="" alt="dos" />
      </header>

      <div className="metas-container">
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Ejercicio</h3>
            <p className="porcentaje">""</p>
          </div>

        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Meditar</h3>
            <p className="porcentaje">""</p>
          </div>

        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Salud</h3>
            <p className="porcentaje">""
            </p>
          </div>

        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Salud Mental</h3>
            <p className="porcentaje">""</p>
          </div>

        </div>
        <div className="progress">
          <div className="progress__content"></div>
        </div>
      </div>
      {console.log()}
    </div>


  );
}
export default Health;