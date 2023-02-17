import React, { useMemo } from "react";
import { Field, Form as FormFormik, Formik } from "formik";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  //FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

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

  const initialValues = useMemo(
    () => ({
      sentence: "",
      translation: "",
      remember: "1",
    }),
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log("values", values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <FormFormik>
          <Field name="sentence" validate={validateSentence}>
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
          <Field name="translation" validate={validateTranslation}>
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
          <Field name="remember" validate={validateRemember}>
            {({ field, form }: any) => (
              <FormControl
                as="fieldset"
                isRequired
                isInvalid={form.errors.remember && form.touched.remember}
                mt="30px"
              >
                <FormLabel as="legend" fontSize={["14px", "16px"]}>
                  Remember
                </FormLabel>
                <RadioGroup {...field}>
                  <HStack spacing="10px">
                    <Radio size={["sm", "md"]} value="1">
                      Every 1 hours
                    </Radio>
                    <Radio size={["sm", "md"]} value="3">
                      Every 3 hours
                    </Radio>
                    <Radio size={["sm", "md"]} value="5">
                      Every 5 hours
                    </Radio>
                  </HStack>
                </RadioGroup>
                {/*<FormHelperText>Select only if you're a fan.</FormHelperText>*/}
                <FormErrorMessage>{form.errors.remember}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Flex justifyContent="flex-end" mt="30px">
            <Button
              bg="#ED8936"
              size="sm"
              m="5px"
              _hover={{
                bg: "#DD6B20",
              }}
              mt={4}
              isLoading={props.isSubmitting}
              type="submit"
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
