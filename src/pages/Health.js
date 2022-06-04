import React from "react";
import Header from "../components/Header";
import "../CSS/Health.css";
import {
  addTodoToGoal,
  getAllGoals,
  saveGoal,
  updateGoal,
  updateGoalTodo,
  deleteGoal,
} from "../services/goals.service";
import GoalModal from "../components/GoalModal";

//importando imagen
import blob2 from "../assets/blob02.png";

import ProgressBar from "../components/Progress";

import PieChart from './PieChart';

function Health() {

  //jala el total de metas y cuantas han sido completadas para sacar el porcentaje
  //Categoria Salud
  let totalS = getAllGoals().filter(element => element.category == "health").length;
  let contS = getAllGoals().filter(element => element.category == "health" && element.completed == true).length;
  //verifica que no sea cero para que no de error la division
  if (totalS == 0) {
    totalS = 1;
  }
  let C_Salud = (contS * 100) / totalS;
  let porcentajeS = C_Salud + "%";

  //Categoria Ejercicio
  let totalE = getAllGoals().filter(element => element.category == "exercise").length;
  let contE = getAllGoals().filter(element => element.category == "exercise" && element.completed == true).length;
  //verifica que no sea cero para que no de error la division
  if (totalE == 0) {
    totalE = 1;
  }
  let C_Ejercicio = (contE * 100) / totalE;
  let porcentajeE = C_Ejercicio + "%";

  //Categoria Meditar
  let totalM = getAllGoals().filter(element => element.category == "learn").length;
  let contM = getAllGoals().filter(element => element.category == "learn" && element.completed == true).length;
  if (totalM == 0) {
    totalM = 1;
  }
  let C_Meditar = (contM * 100) / totalM;
  let porcentajeM = C_Meditar + "%";

  //Categoria Salud Mental
  let totalSM = getAllGoals().filter(element => element.category == "mental-health").length;
  let contSM = getAllGoals().filter(element => element.category == "mental-health" && element.completed == true).length;
  if (totalSM == 0) {
    totalSM = 1;
  }
  let C_SaludM = (contSM * 100) / totalSM;
  let porcentajeSM = C_SaludM + "%";



  return (
    <div className="health">

      <header className="header">
        <Header title="Bienestar" subtitle="Estadísticas de tus metas" Bandera={true}></Header>
        
        <img className="uno" src={blob2} alt="uno" />
        <img className="dos" src={blob2} alt="dos" />
      </header>

      <div className="metas-container">
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Ejercicio</h3>
            <p className="porcentaje">{porcentajeE}</p>
          </div>
          <ProgressBar className="bar" value={C_Ejercicio} max={100} />
        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Meditar</h3>
            <p className="porcentaje">{porcentajeM}</p>
          </div>
          <ProgressBar className="bar" value={C_Meditar} max={100} />
        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Salud</h3>
            <p className="porcentaje">{porcentajeS}
            </p>
          </div>
          <ProgressBar className="bar" value={C_Salud} max={100} />
        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Salud Mental</h3>
            <p className="porcentaje">{porcentajeSM}</p>
          </div>
          <ProgressBar className="bar" value={C_SaludM} max={100} />
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