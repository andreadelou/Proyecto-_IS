import './App.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState } from "react";





function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
  
}



function App() {
  
  return (


    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="calendario.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Calendario
        </a>
       
        
        
        
      </header>
    </div>
  );
}

//export default App;
export default MyApp;
