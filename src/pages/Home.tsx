import { useCallback, useEffect, useState } from "react";
import { CircularProgress, Flex } from "@chakra-ui/react";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phrases, setPhrases] = useState([]);

  const getAllPhrases = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/phrases`
      );
      setPhrases(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateListPhrase = useCallback(
    (id: number) => {
      const newList = phrases.filter((p: any) => p.phrase_id !== id);
      setPhrases(newList);
    },
    [phrases]
  );

  useEffect(() => {
    getAllPhrases();
  }, [getAllPhrases]);

  return (
    <Flex justifyContent="center">
      <Flex
        flexWrap="wrap"
        justifyContent={["center", "center", "space-between"]}
        alignItems="center"
        maxW="700px"
        mt="50px"
      >
        {isLoading ? (
          <CircularProgress isIndeterminate color="green.300" />
        ) : (
          phrases.map(({ phrase_id, phrase, translate, time }) => {
            return (
              <Card
                updateListPhrase={updateListPhrase}
                key={phrase_id}
                phrase={phrase}
                translate={translate}
                phrase_id={phrase_id}
                time={time}
              />
            );
          })
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
