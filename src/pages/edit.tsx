import { Box, Flex, Heading } from "@chakra-ui/react";
import FormEdit from "../components/FormEdit";

const Edit = () => {
  return (
    <Flex justifyContent="center" p="20px">
      <Flex flexDirection="column" maxW="700px" mt="50px">
        <Heading size={["md", "lg"]} mb="10px">
          Edit Sentence
        </Heading>
        <Box mt={["20px", "50px"]}>
          <FormEdit />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Edit;
