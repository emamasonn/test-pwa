import { useCallback, useMemo } from "react";
import { Field, Form as FormFormik, Formik } from "formik";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";

const Form = () => {
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
      error = "Remember is required";
    }
    return error;
  };

  const currentHours = useMemo(() => {
    const date = new Date();
    let hours = date.getHours();
    const formateHours = hours > 9 ? hours : `0${hours}`;

    const minutes = date.getMinutes();
    return `${formateHours}:${minutes}`;
  }, []);

  const initialValues = useMemo(
    () => ({
      phrase: "",
      translate: "",
      time: currentHours,
    }),
    [currentHours]
  );

  const createNewPhrase = useCallback(async (values: any, actions: any) => {
    try {
      const body = {
        phrase: values.phrase,
        time: values.time,
        translate: values.translate,
        deleted: false,
      };
      await axios.post(`${process.env.REACT_APP_BASE_URL}/phrases`, body);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => createNewPhrase(values, actions)}
    >
      {(props) => (
        <FormFormik>
          <Field name="phrase" validate={validateSentence}>
            {({ field, form }: any) => (
              <FormControl
                isRequired
                isInvalid={form.errors.sentence && form.touched.sentence}
              >
                <FormLabel fontSize={["14px", "16px"]}>Sentence</FormLabel>
                <Input {...field} placeholder="sentence" size={["sm", "md"]} />
                <FormErrorMessage>{form.errors.sentence}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="translate" validate={validateTranslation}>
            {({ field, form }: any) => (
              <FormControl
                isRequired
                isInvalid={form.errors.translation && form.touched.translation}
                mt="30px"
              >
                <FormLabel fontSize={["14px", "16px"]}>Translation</FormLabel>
                <Input
                  {...field}
                  placeholder="Translation"
                  size={["sm", "md"]}
                />
                <FormErrorMessage>{form.errors.translation}</FormErrorMessage>
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
          <Box display="flex" justifyContent="flex-end" mt="30px">
            <Button
              bg="#ED8936"
              size="sm"
              m="5px"
              isLoading={props.isSubmitting}
              type="submit"
              loadingText="Submitting"
              _hover={{
                bg: "#DD6B20",
              }}
            >
              Submit
            </Button>
          </Box>
        </FormFormik>
      )}
    </Formik>
  );
};

export default Form;
