import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-smart-toaster";

import {
  Text,
  Box,
  Flex,
  Error,
  Grid,
  Button,
  Modal,
  ModalClose,
  HelpTooltip,
} from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { FormInput } from "molecules/FormInput/FormInput";
import { decodeFromBech32, encodeToBech32 } from "../../../../../utils/utility";
import {
  PostSendTokenAction,
  resetSendTokenReducer,
} from "../../actions/WalletActions";
import { SuccessBox } from "../../../../../atoms/Modal/SuccesBox";

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
  const loading = useSelector((state) => state.walletReducer.loading);
  const sendTokens = useSelector((state) => state.walletReducer.sendTokens);
  const { visible, hide, toggle } = useVisibleState(false);
  const [sendDataObj, setSendDataObj] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [initialValues, setInitialValues] = useState({
    address: "",
    amount: "",
    memo: "",
    password: "",
  });

  const onSubmitChildHandler = (values, submitProps) => {
    if (decodeFromBech32(values.address) === false) {
      toast.error("Invalid To Address");
    } else {
      let dataObj = {
        address: decodeFromBech32(values.address),
        amount: values.amount,
      };
      setSendDataObj(dataObj);
      submitProps.resetForm();
      toggle();
    }
  };

  useEffect(() => {
    if (sendTokens?.data?.success === true) {
      setShowSuccess(true);
    }
  }, [sendTokens]);

  const onCloseSuccess = () => {
    hide();
    dispatch(resetSendTokenReducer());
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
      to_address: sendDataObj.address,
      amount: amount,
    };

    if (values.memo !== "") {
      postData["memo"] = values.memo;
    }

    dispatch(PostSendTokenAction(postData));
  };

  const onClickMaxhandler = (setFieldValue) => {
    setFieldValue("amount", accountDetails?.data?.result?.coins[0]?.value);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaSendToken}
        onSubmit={onSubmitChildHandler}
        enableReinitialize
      >
        {({ setFieldValue }) => {
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
                <Box>
                  <FormInput type="text" name="amount" label="Enter Amount" />
                  <Box position="absolute" pr="1rem" bottom=".8rem" right={0}>
                    <Text
                      variant="label"
                      textTransform="capitalize"
                      fontWeight="medium"
                      cursor="pointer"
                      onClick={() => onClickMaxhandler(setFieldValue)}
                    >
                      Max
                    </Text>
                  </Box>
                </Box>

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
        <Modal
          isOpen={visible}
          onRequestClose={!loading && hide}
          ariaHideApp={false}
        >
          {showSuccess ? (
            <SuccessBox
              onCloseSuccess={onCloseSuccess}
              txHash={sendTokens?.data?.result?.txhash}
            />
          ) : (
            <>
              <ModalClose onClick={!loading && hide} />
              <Grid gridTemplateColumns="35rem 20rem">
                <Formik
                  initialValues={initialValues}
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
                          <HelpTooltip />
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
                            {encodeToBech32(
                              sendDataObj?.address,
                              "sentvaloper"
                            )}
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
                            {sendDataObj?.amount}
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
                                <HelpTooltip />
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
                            <Button
                              px="8rem"
                              justifySelf="center"
                              type="submit"
                              disabled={loading}
                              loading={loading}
                            >
                              SEND
                            </Button>
                          </Box>
                        </Form>
                      </Box>
                    );
                  }}
                </Formik>
              </Grid>
            </>
          )}
        </Modal>
      )}
    </>
  );
};
