import { useCallback, useMemo } from "react";
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
  Flex,
  TagLeftIcon,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { FaStopwatch } from "react-icons/fa";
import axios from "axios";

type PropsCard = {
  updateListPhrase: (phrase_id: any) => void;
  phrase: string;
  translate: string;
  phrase_id: string;
  time: any;
};

const Card = ({
  phrase,
  translate,
  phrase_id,
  time,
  updateListPhrase,
}: PropsCard) => {
  const navigate = useNavigate();

  const handleEditPhrase = useCallback(() => {
    navigate(`/edit/${phrase_id}`);
  }, [navigate, phrase_id]);

  const handleDeletePhrase = useCallback(async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/phrases/${phrase_id}`
      );
      updateListPhrase(phrase_id);
    } catch (error) {
      console.log(error);
    }
  }, [updateListPhrase, phrase_id]);

  const formatTime = useMemo(() => {
    return Number(time.slice(0, 2)) > 12
      ? `${time.slice(0, 5)} PM`
      : `${time.slice(0, 5)} AM`;
  }, [time]);

  return (
    <CardChakra bg="yellow.50" m="7px" w="100%" maxW="330px" minW="330px">
      <CardBody>
        <Stack divider={<StackDivider borderColor="orange.300" />} spacing="4">
          <Box>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="xs" color="orange.500">
                Sentence
              </Heading>
              <Tag size="sm" variant="subtle" colorScheme="orange.500">
                <TagLeftIcon boxSize="12px" as={FaStopwatch} />
                <TagLabel>{formatTime}</TagLabel>
              </Tag>
            </Flex>
            <Text pt="2" fontSize="md">
              {phrase}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" color="orange.500">
              Translation
            </Heading>
            <Text pt="2" fontSize="md">
              {translate}
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
            onClick={handleEditPhrase}
          >
            Edit
          </Button>
          <Button
            onClick={handleDeletePhrase}
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
