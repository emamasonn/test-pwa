import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box position="relative">
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:phrase_id" element={<Edit />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
