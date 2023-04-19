import { useCallback, useEffect, useMemo, useState } from "react";
import { Field, Form as FormFormik, Formik } from "formik";

import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";

const Form = () => {
  const [phrase, setPhrase] = useState<any>();
  const { phrase_id } = useParams();

  const handleGetPhraseById = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/phrases/${phrase_id}`
      );
      setPhrase(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [phrase_id]);

  useEffect(() => {
    handleGetPhraseById();
  }, [handleGetPhraseById]);

  const validateSentence = (value: string) => {
    let error;
    if (!value) {
      error = "Sentence is required";
    }
    return error;
  };

  const validateTranslation = (value: string) => {
    let error;
    if (!value) {
      error = "Translation is required";
    }
    return error;
  };

  const validateRemember = (value: string) => {
    let error;
    if (!value) {
      error = "Time is required";
    }
    return error;
  };

  const editPhrase = useCallback(
    async (values: any, actions: any) => {
      try {
        const body = {
          phrase: values.phrase,
          time: values.time,
          translate: values.translate,
          deleted: false,
        };

        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/phrases/${phrase_id}`,
          body
        );
      } catch (error) {
        console.error(error);
      }
    },
    [phrase_id]
  );

  const initialValues = useMemo(() => {
    if (!phrase) return;
    const time = phrase.time.slice(0, 5);
    return {
      ...phrase,
      time,
    };
  }, [phrase]);

  if (!phrase) {
    return <CircularProgress isIndeterminate color="green.300" />;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => editPhrase(values, actions)}
    >
      {(props) => (
        <FormFormik>
          <Field name="phrase" validate={validateSentence}>
            {({ field, form }: any) => (
              <FormControl
                isRequired
                isInvalid={form.errors.phrase && form.touched.phrase}
              >
                <FormLabel fontSize={["14px", "16px"]}>Sentence</FormLabel>
                <Input {...field} placeholder="phrase" size={["sm", "md"]} />
                <FormErrorMessage>{form.errors.phrase}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="translate" validate={validateTranslation}>
            {({ field, form }: any) => (
              <FormControl
                isRequired
                isInvalid={form.errors.translate && form.touched.translate}
                mt="30px"
              >
                <FormLabel fontSize={["14px", "16px"]}>Translation</FormLabel>
                <Input
                  {...field}
                  placeholder="Translation"
                  size={["sm", "md"]}
                />
                <FormErrorMessage>{form.errors.translate}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="time" validate={validateRemember}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  as="fieldset"
                  isRequired
                  isInvalid={form.errors.time && form.touched.time}
                  mt="30px"
                >
                  <FormLabel as="legend" fontSize={["14px", "16px"]}>
                    Remember
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Select Time"
                    size="md"
                    type="time"
                  />

                  <FormErrorMessage>{form.errors.time}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>
          <Flex justifyContent="flex-end" mt="30px">
            <Button
              bg="#ED8936"
              size="sm"
              m="5px"
              _hover={{
                bg: "#DD6B20",
              }}
              mt="4px"
              isLoading={props.isSubmitting}
              type="submit"
              loadingText="Submitting"
            >
              Submit
            </Button>
          </Flex>
        </FormFormik>
      )}
    </Formik>
  );
};

export default Form;
