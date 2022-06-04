import { useEffect, useState } from 'react';

import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import {
  fetchAllGoals,
  fetchAllGoalsAndGroupByCategory
} from "../services/goals.service";

ChartJs.register(
  Tooltip,Title,ArcElement,Legend
);



function PieChart() {

  const data = {
    datasets: [
      {
        data: [10,20,30],
        
        backgroundColor: [
          'red',
          'yellow',
          'blue'
        ]
      }
      
    ],

    labels:[
      'Red',
      'Yellow',
      'Blue'
    ]
  };

  
  return (
    <div className="App" style={{width:'30%', height:'30%'}}>
      <Pie data = {data}/>
      {console.log(fetchAllGoalsAndGroupByCategory())}
    </div>
      
  );
}

export default PieChart;