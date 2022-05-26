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


function NuevasMetas(){
  const [user, loading, error] = useAuthState(auth);

  const [goals, setMetas] = useState([]);
  const fetchGoals = async () => {
    const metas = await fetchAllGoals();
    console.log(metas)
    setMetas((metas));
  };
  useEffect(() => {
    if (auth.currentUser) {
      fetchGoals();
    }
  }, [user]);
 
  return(
  <div>
    <h1>Hello</h1>
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
    
  )
}



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

  function listaMeta(){{goals.map(meta=>{
    var loop =''
    var i=0;
    while(i<meta.length){
      loop+= `<li>${meta[i]}</li>`;
       i++;
  //    
  console.log(loop)
    }
    
    })}

    console.log(listaMeta)


}

 

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
    <h1>{listaMeta()}</h1>
    <h1>{NuevasMetas()}</h1>
 </div>
    

    </div>

       


    
  );
}

export default Calendario;