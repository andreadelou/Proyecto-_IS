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
  const [categoria, setCategoria] = useState([]);
  const [fecha, setFecha] = useState([]);

  //fetch goals
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

  
 const metasCard= goals.map(meta=>(
  <h1 key={meta}>{meta.title}</h1>
  ));



//fetch categorias
  const fetchCategoria = async () => {
    const metas = await fetchAllGoals();
    console.log(metas)
    setCategoria((metas));
  };
  useEffect(() => {
    if (auth.currentUser) {
      fetchCategoria();
    }
  }, [user]);


  const categoryCard= categoria.map(cate=>(
    <h1 key={cate}>{cate.category}</h1>
    ));

//fetch fecha
const fetchFecha = async () => {
  const metas = await fetchAllGoals();
  console.log(metas)
  setFecha((metas));
};
useEffect(() => {
  if (auth.currentUser) {
    fetchFecha();
  }
}, [user]);


// const metasFecha= fecha.map(fechaR=>(
//   <h1 key={fechaR}>{fechaR.reminder.toString()}</h1>
// ));

const metasFecha= fecha.map((fechaR) => {
  console.log(fechaR)
});

  // console.log(fechaR);
  console.log("sale");

  var i=-1;


  //empieza el for
  // for(i in metasCard){
    
  //   i++;
  //   console.log(categoryCard[i].props.children)
  //     return(
  //       <div>
  //         <Card className='cartas'
  //           >
  //             <CardContent>
                
  //               <Typography variant="h5" component="h2">
  //                 Tareas
  //               </Typography>
  //               <Typography>
  //               <span>{metasCard}</span>  
  //               {/* <span>{metasFecha}</span>       */}
  //               <span>{categoryCard}</span>           
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //       </div> 
  //     )
  
  // }

  for (let index = 0; index <= metasCard; index++) {
    const element = metasCard[index];
    console.log("dtucuj",element);
    
  }


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
    // console.log(metas)
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
    <h1>{NuevasMetas()}</h1>
 </div>
    </div>

  );
}

export default Calendario;