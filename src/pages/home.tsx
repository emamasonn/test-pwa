import React from "react";
import { Flex } from "@chakra-ui/react";
import { sentences } from "../mock/sentences";
import Card from "../components/card";

const Home = () => {
  return (
    <Flex justifyContent="center">
      <Flex
        flexWrap="wrap"
        justifyContent={["center", "center", "space-between"]}
        alignItems="center"
        maxW="700px"
        mt="50px"
      >
        {sentences.map(({ id, sentence, translation }) => (
          <Card key={id} sentence={sentence} translation={translation} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
