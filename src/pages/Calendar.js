import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../CSS/Calendario.css";

function Calendario() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='app'>
      <h1 className='text-center'>Calendario de este mes</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Dia seleccinado:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default Calendario;