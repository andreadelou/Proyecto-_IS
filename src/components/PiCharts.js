import { useEffect, useState } from 'react';

import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJs.register(
  Tooltip,Title,ArcElement,Legend
);



function PieCharts() {
    const [lista, setLista] = useState([])



  const data = {
    datasets: [
      {
        data: [10,20,30,20],
        
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