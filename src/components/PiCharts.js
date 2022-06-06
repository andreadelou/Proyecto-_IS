import { useEffect, useState } from 'react';

import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";

import { fetchAllGoalsAndGroupByCategory } from "../services/goals.service";


ChartJs.register(
  Tooltip,Title,ArcElement,Legend
);


function PieCharts() {
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
  
  const data = {
    datasets: [
      {
        data: [exer,apren,salu,saludM],
        
        backgroundColor: [
          '#ffabab',
          '#fff78a',
          '#ace7ff',
          '#a79aff',
        ]
      }
      
    ],

    labels:[
     'Exercise',
      'Learn',
      'Health',
      'Mental-Health'
    ]
  };

  
  return (
    <div className="App" style={{width:'30%', height:'30%'}}>
      <Pie data = {data}/>
      
    </div>
      
  );
}

export default PieCharts;