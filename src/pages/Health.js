import React from 'react'
import '../CSS/Health.css';

//importando imagen
import imgfondo from '../img/Group5.png';

function Health() {
    return (
        <div className = "todo">
            <body>
            
            <img className = "uno" src = {imgfondo} alt='uno' />
            <img className = "dos" src = {imgfondo} alt='dos' />
            
            <h2>Salud</h2>
            <p className = "desc">Estadísticas de tus metas</p>
            <h3 className = "estadis1">Ejercicio</h3>
            <h3 className = "estadis2">Leer</h3>
            <h3 className = "estadis3">Tomar tus medicinas</h3>
            <h3 className = "estadis4">Meditar</h3>

            <p className = "cont1">25/30 días</p>
            <p className = "cont2">29/30 días</p>
            <p className = "cont3">29/30 días</p>
            <p className = "cont4">15/30 días</p>

            <div className = "amarillo1">

                <div className = "azul1"></div>
                
            </div>
            <div className = "amarillo2">

                <div className = "azul2"></div>
                
            </div>
            <div className = "amarillo3">

                <div className = "azul3"></div>
                
            </div>
            <div className = "amarillo4">

                <div className = "azul4"></div>
                
            </div>
            
            </body>
        </div>
    )
}
export default Health