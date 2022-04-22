import React from "react";
import Header from "../components/Header";
import "../CSS/Health.css";

//importando imagen
import blob2 from "../assets/blob02.png";

function Health() {
  return (
    <div className="health">
      <header className="header">
        <Header title="Salud" subtitle="Estadísticas de tus metas" Bandera={true}></Header>
        <img className="uno" src={blob2} alt="uno" />
        <img className="dos" src={blob2} alt="dos" />
      </header>

      <div className="metas-container">
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Ejercicio</h3>
            <p className="">25/30 días</p>
          </div>
          <div className="progress">
            <div className="progress__content"></div>
          </div>
        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Leer</h3>
            <p className="">29/30 días</p>
          </div>
          <div className="progress">
            <div className="progress__content"></div>
          </div>
        </div>
        <div className="metas-container__stat">
          <div className="metas-container__stat-header">
            <h3 className="">Medicina</h3>
            <p className="">15/30 días</p>
          </div>
          <div className="progress">
            <div className="progress__content"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Health;
