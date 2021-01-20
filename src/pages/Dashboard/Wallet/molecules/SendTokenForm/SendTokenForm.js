import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { Text, Box, Flex, Error, Grid, Button, Modal, ModalClose } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { FormInput } from "molecules/FormInput/FormInput";
import MemoHelp from "assets/icons/Help";
import { decodeFromBech32 } from "../../../../../utils/utility";
import { PostSendTokenAction } from "../../actions/WalletActions";

const initialValues = {
  address: "",
  amount: "",
  memo: "",
  password: "",
};
const validationSchemaSendToken = yup.object({
  address: yup.string().required("Required"),
  amount: yup
    .string()
    .matches(/^[0-9]*$/, "Only Numbers allowed")
    .required("Required"),
});
const validationSchemaSendingTokenAddress = yup.object({
  password: yup.string().required("Required"),
});

export const SendTokenForm = () => {
  const dispatch = useDispatch();
  const accountDetails = useSelector(
    (state) => state.walletReducer.accountDetails
  );
  const loading = useSelector(state => state.walletReducer.loading);
  const { visible, hide, toggle } = useVisibleState(false);
  const [sendDataObj, setSendDataObj] = useState(null);
  const [formValues, setFormValues] = useState(null);

  const onSubmitChildHandler = (values, submitProps) => {
    let dataObj = {
      address: values.address,
      amount: values.amount,
    };
    setSendDataObj(dataObj);
    submitProps.resetForm();
    toggle();
  };

  const onSubmit = (values, submitProps) => {
    let amount = [
      {
        denom: accountDetails?.data?.result?.coins[0].denom,
        value: JSON.parse(sendDataObj.amount),
      },
    ];

    let postData = {
      password: values.password,
      to_address: decodeFromBech32(sendDataObj.address),
      amount: amount,
    };

    if (values.memo !== "") {
      postData["memo"] = values.memo;
    }

    dispatch(PostSendTokenAction(postData));
    submitProps.resetForm();
    toggle();
  };

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchemaSendToken}
        onSubmit={onSubmitChildHandler}
        enableReinitialize
      >
        {() => {
          return (
            <Form>
              <Box mx="3rem" mt="3rem">
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  To Address
                </Text>
                <FormInput
                  type="text"
                  name="address"
                  label="Enter To Address"
                  autofocus
                />
                <ErrorMessage name="address" component={Error} />
              </Box>
              <Box mx="3rem">
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  Amount
                </Text>
                <FormInput
                  type="text"
                  name="amount"
                  label="Enter Amount"
                  maxValue="Max"
                />
                <ErrorMessage name="amount" component={Error} />
              </Box>
              <Flex justifySelf="center">
                <Button px="3rem" m="auto" type="submit">
                  Send
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
          <Grid gridTemplateColumns="35rem 20rem">
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchemaSendingTokenAddress}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {() => {
                return (
                  <Box ml="1rem">
                    <Flex alignItems="center">
                      <Text
                        variant="title"
                        fontWeight="medium"
                        color="primary.700"
                        py="2rem"
                        mr="1rem"
                      >
                        SENDING TOKENS to
                      </Text>
                      <MemoHelp height="1.5rem" width="1.5rem" />
                    </Flex>
                    <Grid gridTemplateColumns="15rem 1fr">
                      <Text
                        variant="label"
                        fontWeight="medium"
                        color="grey.700"
                        textTransform="uppercase"
                      >
                        To Address
                      </Text>
                      <Text
                        variant="body"
                        fontWeight="medium"
                        color="grey.900"
                        pb="1rem"
                      >
                        {sendDataObj.address}
                      </Text>
                    </Grid>
                    <Grid gridTemplateColumns="15rem 1fr">
                      <Text
                        variant="label"
                        fontWeight="medium"
                        color="grey.700"
                        textTransform="uppercase"
                      >
                        Tokens
                      </Text>
                      <Text
                        variant="body"
                        fontWeight="medium"
                        color="grey.900"
                        m={0}
                        pb="1rem"
                      >
                        {sendDataObj.amount}
                      </Text>
                    </Grid>

                    <Form>
                      <Box my="2rem">
                        <Box>
                          <Flex alignItems="center">
                            <Text
                              variant="label"
                              fontWeight="medium"
                              color="grey.700"
                              textTransform="uppercase"
                              mr="1rem"
                            >
                              MEMO
                            </Text>
                            <MemoHelp height="1.5rem" width="1.5rem" />
                          </Flex>
                          <FormInput
                            as="textarea"
                            rows="3"
                            name="memo"
                            label="Enter Memo"
                            autofocus
                          />
                          <ErrorMessage name="memo" component={Error} />
                        </Box>
                        <Box>
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
                        <Button px="8rem" justifySelf="center" type="submit">
                          SEND
                        </Button>
                      </Box>
                    </Form>
                  </Box>
                );
              }}
            </Formik>
          </Grid>
        </Modal>
      )}
    </>
  );
};
