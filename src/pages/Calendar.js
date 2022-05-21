import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../components/Header';
import "../CSS/Calendario.css";
import blob from "../assets/blob01.png";
import { Image } from '@chakra-ui/react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  fetchAllGoals,
  fetchAllGoalsAndGroupByCategory
} from "../services/goals.service";
import { loginWithEmailAndPassword, auth, logout } from "../firebase.js";



function Calendario() {
  const [date, setDate] = useState(new Date()); //date que sale abajo del calendario
  const [user, loading, error] = useAuthState(auth);

  const [goals, setMetas] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchGoals();
    }
  }, [user]);
  const fetchGoals = async () => {
    const metas = await fetchAllGoals();
    console.log(metas)
    setMetas((metas));
  };

 

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
            {goals.map(meta=>{return <>
              {meta.title}
            </>})}
            
          </Typography>
        </CardContent>
      </Card>

 </div>
 

    </div>

       


    
  );
}

export default Calendario;