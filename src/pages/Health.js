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
            <p>Estadísticas de tus metas</p>
            </body>
        </div>
    )
}
export default Health