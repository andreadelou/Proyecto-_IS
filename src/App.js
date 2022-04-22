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
import Calendario from './pages/Calendar';
import Goals from './pages/Goals';
import Welcome from './pages/Welcome';
import Goals from './pages/Goals'



function App() {
  const Input = {
    variants: {
      input: {
        field: {
          border: "2px solid",
          borderColor: "primary",
          color: "black",
          _focus: {
            boxShadow: "none"
          }
        },
      },
    },
  }
  const theme = extendTheme({
    colors: {
      primary: "#6C8CBF",
      primaryLight: "#7793c2",
      secondary: "#FEF1B9",
      background: "#F2F6FF",
      textDark: "#1F1338",
      textLight: "#fff"
    },
    fonts: {
      heading: "Source Sans Pro, sans-serif",
      body: "Source Sans Pro, sans-serif"
    },
    components: {
      Input
    }
  });
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/goals" element={<Goals />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/health" element={<Health />} />
          <Route exact path="/calendar" element={<Calendario />} />
          <Route exact path="/welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

