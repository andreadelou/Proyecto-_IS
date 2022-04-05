import './App.css';
import Goals from './pages/Goals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';;



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

        </Routes>
      </Router>
    </ChakraProvider>
  );
}
//<Route exact path="/goals" element={<Goals />} />
export default App;
