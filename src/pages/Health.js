import React from "react";
import Header from "../components/Header";
import "../CSS/Health.css";
/*import {
  fetchLengthCategory
} from "../services/goals.service";*/
import GoalModal from "../components/GoalModal";

//importando imagen
import blob2 from "../assets/blob02.png";

//import ProgressBar from "../components/ProgressBar.jsx";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";

import { fetchAllGoalsAndGroupByCategory } from "../services/goals.service";


import { useEffect, useState } from "react";

import PieChart from "../components/PiCharts";


function Health() {

  const [ejercicioT, setEjercicioT] = useState(0);
    const [apredizajeT, setApredizajeT] = useState(0);
    const [saludT, setSaludT] = useState(0);
    const [saludMental, setsaludMental] = useState(0);

    const [lista, setLista] = useState([]);


    const [user, loading, error] = useAuthState(auth);
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
    //setEjercicioT(goals[goals.category == 'exercise'].length)
    /*setApredizajeT(goals.learn.length)
    setSaludT(goals.health.length)
    setSaludMentalT(goals.mental_health.length)*/

    setGoals(Object.entries(goals));
    
    console.log(goals);

    

    try{
    setEjercicioT(goals.exercise.length);
    
    }
    catch{
      setEjercicioT(0);
    }
    try{
    setApredizajeT(goals.learn.length);

    }
    catch{
      setApredizajeT(0);
    }
    try{
      setSaludT(goals.health.length);

    }
    catch{
      setSaludT(0);
    }
    try{
    setsaludMental(goals.mentalhealth.length);

    }
    catch{
      setsaludMental(0);
    }


  };


  const num = [];
  let total = 0;

  num.push(ejercicioT);
  
  num.push(apredizajeT);
  
  num.push(saludT);
  
  num.push(saludMental);

  console.log(num);

  total = num[0]+num[1]+num[2]+num[3];

  console.log(total);

  let exer = 0;
  let apren = 0;
  let salu = 0;
  let saludM = 0;

  exer = (ejercicioT*100)/total;
  apren = (apredizajeT*100)/total;
  salu = (saludT*100)/total;
  saludM = (saludMental*100)/total;



  return (
    <div className="health">

      <header className="header">
        <Header title="Bienestar" subtitle="Estadísticas de tus metas" Bandera={true}></Header>
        <p>porcentaje por categoria de tus metas con respecto al total de metas</p>
        <img className="uno" src="" alt="uno" />
        <img className="dos" src="" alt="dos" />
      </header>

      <div className="metas-container">
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Ejercicio</h3>
            <p className="porcentaje">{exer}%</p>
          </div>

        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Meditar</h3>
            <p className="porcentaje">{apren}%</p>
          </div>

        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Salud</h3>
            <p className="porcentaje">{salu}%</p>
          </div>

        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Salud Mental</h3>
            <p className="porcentaje">{saludM}%</p>
          </div>

        </div>
        <div className="progress">
          <div className="progress__content"></div>
        </div>
      </div>
      <PieChart></PieChart>
    </div>


  );
}
export default Health;