import './App.css';
import './CSS/App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home';
import Health from './pages/Health';
//import Goals from './pages/Goals';


function App() {
  return (
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
