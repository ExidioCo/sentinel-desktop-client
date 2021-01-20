import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  Box,
  Grid,
  Text,
  Flex,
  Modal,
  Error,
  ModalClose,
  Button,
  HelpTooltip,
} from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";

const initialValues = {
  password: "",
};
const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
});

export const SubscribeIndividualHostModal = ({
  setSubscribedIndividual,
  visible,
  hide,
  toggle,
}) => {
  const [formValues, setFormValues] = useState(null);

  const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    submitProps.resetForm();
    toggle();
    setSubscribedIndividual(true);
  };

  return (
    <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
      <ModalClose onClick={hide} />
      <Grid gridTemplateColumns="35rem 20rem">
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {() => {
            return (
              <Box mx="1rem">
                <Flex alignItems="center" py="1rem">
                  <Text
                    variant="title"
                    fontWeight="medium"
                    color="primary.700"
                    pr="1rem"
                  >
                    Subscribe to
                    <Text as="span" color="primary.500" pl=".5rem">
                      ABC Node Hoster
                    </Text>
                  </Text>
                  <HelpTooltip />
                </Flex>
                <Box pt="2rem">
                  <Text
                    variant="label"
                    fontWeight="medium"
                    color="grey.700"
                    textTransform="uppercase"
                  >
                    Provider Address
                  </Text>
                  <Text
                    variant="body"
                    fontWeight="medium"
                    color="primary.700"
                    pt="1rem"
                  >
                    cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj
                  </Text>
                </Box>
                <Grid gridAutoFlow="column" gridGap="7rem" mt="2rem">
                  <Box>
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                    >
                      PLAN
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="primary.700"
                      pt="1rem"
                    >
                      50GB / 15000SENT
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                    >
                      VALIDITY
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="primary.700"
                      pt="1rem"
                    >
                      2 Months
                    </Text>
                  </Box>
                </Grid>
                <Form>
                  <Box my="3rem">
                    <Box mt="3rem">
                      <Text
                        variant="label"
                        fontWeight="medium"
                        color="grey.700"
                        textTransform="uppercase"
                      >
                        PASSWORD
                      </Text>
                      <FormInput
                        type="password"
                        name="password"
                        label="Enter Password"
                      />
                      <ErrorMessage name="password" component={Error} />
                    </Box>
                    <Button px="3rem" justifySelf="center" type="submit">
                      SUBSCRIBE
                    </Button>
                  </Box>
                </Form>
              </Box>
            );
          }}
        </Formik>
      </Grid>
    </Modal>
  );
};
