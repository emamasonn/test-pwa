import React from "react";
import {
  CardBody,
  Card as CardChakra,
  StackDivider,
  Box,
  Stack,
  Heading,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

type PropsCard = {
  sentence: string;
  translation: string;
};

const Card = ({ sentence, translation }: PropsCard) => {
  return (
    <CardChakra
      bg="yellow.50"
      m="7px"
      w="100%"
      maxW="330px"
      minW="330px"
      //_hover={{
      //  bg: "yellow.100",
      //}}
    >
      <CardBody>
        <Stack divider={<StackDivider borderColor="orange.300" />} spacing="4">
          <Box>
            <Heading size="xs" color="orange.500">
              Sentence
            </Heading>
            <Text pt="2" fontSize="md">
              {sentence}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" color="orange.500">
              Translation
            </Heading>
            <Text pt="2" fontSize="md">
              {translation}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="flex-end" alignItems="center" pt="5px">
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme=""
            bg="orange.100"
            size="xs"
            color="orange.500"
            _hover={{
              bg: "orange.200",
            }}
          >
            Edit
          </Button>
          <Button
            variant="solid"
            color="red"
            size="xs"
            bg="red.100"
            _hover={{
              bg: "red.200",
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </CardChakra>
  );
};

export default Card;
