import Login from './pages/Login';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
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
      <Login />
    </ChakraProvider>
  );
}

export default App;
