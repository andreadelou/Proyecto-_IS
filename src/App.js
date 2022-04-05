<<<<<<< Updated upstream
import './App.css';
import Register from './pages/Register'
=======
import './CSS/App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"; import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Health from './pages/Health';
//import Goals from './pages/Goals';


>>>>>>> Stashed changes
function App() {
  return (
<<<<<<< Updated upstream
    <Register />
  );
}

export default App;
=======
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/health" element={<Health />} />
          
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
//<Route exact path="/goals" element={<Goals />} />
export default App;
>>>>>>> Stashed changes
