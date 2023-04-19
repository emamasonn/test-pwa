import React from "react";

import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import Edit from "./pages/edit";

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
