import React from "react";

import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import Header from "./components/header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box position="relative">
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
