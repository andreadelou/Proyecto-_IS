import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"; import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  const theme = extendTheme({
    colors: {
      primary: "#6C8CBF",
      secondary: "#FEF1B9",
      background: "#F2F6FF",
      textDark: "#1F1338",
      textLight: "#fff"
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
