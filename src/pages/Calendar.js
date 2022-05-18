import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../components/Header';
import "../CSS/Calendario.css";
import blob from "../assets/blob01.png";
import { Image } from '@chakra-ui/react';


import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";




function Calendario() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='principal'>
      <header className="header">
        <Header title="Calendario" subtitle="Organiza tu tiempo" Bandera={true}></Header>
        <Image
          position={"absolute"}
          right="0"
          top="0"
          className="header__image"
          src={blob}
        />
      </header>
      
      <div className='calendar'>
      
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} locale= "es"/>
      </div>
      <p className='text-center'>
        <span  className='bold' >Dia seleccionado:</span>{''}
        {date.toDateString() }  
        
      </p>
      </div>
      
      {/* titulo
      categoria
      fecha
      meta
       */}
 <div className='tareas'>
 <Card className='cartas'
      >
        <CardContent>
          
          <Typography variant="h5" component="h2">
            Tareas
          </Typography>
          <Typography
            style={{
              marginBottom: 12,
            }}
            color="textSecondary"
          >
            Hacer tarea de teoria
          </Typography>
        </CardContent>
      </Card>

 </div>
 

    </div>

       


    
  );
}

export default Calendario;