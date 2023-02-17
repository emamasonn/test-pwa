import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Form from "../components/form";

const Create = () => {
  return (
    <Flex justifyContent="center" p="20px">
      <Flex flexDirection="column" maxW="700px" mt="50px">
        <Heading size={["md", "lg"]} mb="10px">
          Create New Sentence
        </Heading>
        <Box mt={["20px", "50px"]}>
          <Form />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Create;
