import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";

import MemoProfile from "assets/icons/Profile";
import {
  Box,
  Grid,
  Text,
  Flex,
  Modal,
  Error,
  ModalClose,
  Button,
  Loader,
  SentinelLoader,
  HelpTooltip,
} from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { FormInput } from "molecules/FormInput";
import MemoCheck from "assets/icons/Check";

import {
  GetValidatorListAction,
  GetValidatorAvatarAction,
  PostDelegateAction,
  PostReDelegateAction,
  PostUnbondAction,
  GetAnAccountDetailsAction,
  ResetDRUAction,
} from "../../pages/Dashboard/Wallet/actions/WalletActions";
import { encodeToBech32, compareValues, sort } from "../../utils/utility";
import MemoArrowBottom from "assets/icons/ArrowBottom";

const initialValues = {
  amount: "",
  memo: "",
  toValidator: "",
  password: "",
};

const validationSchema = Yup.object({
  amount: Yup.string()
    .matches(/^[0-9]*$/, "Only Numbers allowed")
    .required("Required"),
  memo: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const ValidatorsList = React.memo(
  ({
    index,
    validatorListData,
    dropdownValue,
    hideDelegate,
    setDropdownValue,
    txHash,
    onCloseDelegate,
    delegate,
  }) => {
    const dispatch = useDispatch();
    let address = useSelector(
      (state) => state.loginReducer.checkKeysDetails.data.result[0].address
    );
    let avatar = useSelector((state) => state.walletReducer.validatorAvatar);
    let loading = useSelector((state) => state.walletReducer.loading);
    let accountDetails = useSelector(
      (state) => state.walletReducer.accountDetails
    );
    let validatorListDataObj = validatorListData;

    const { visible, hide, toggle } = useVisibleState(false);

    const onSubmit = (values, submitProps) => {
      let amount = {
        denom: accountDetails?.data?.result?.coins[0].denom,
        value: JSON.parse(values.amount),
      };
      let postData = {
        address: address,
        memo: values.memo,
        amount: amount,
        password: values.password,
      };
      if (dropdownValue === "DELEGATE") {
        postData["to"] = validatorListDataObj.address;
        dispatch(PostDelegateAction(postData));
      } else if (dropdownValue === "RE-DELEGATE") {
        postData["from"] = validatorListDataObj.address;
        postData["to"] = values.toValidator;
        dispatch(PostReDelegateAction(postData));
      } else if (dropdownValue === "UNBOND") {
        postData["from"] = validatorListDataObj.address;
        dispatch(PostUnbondAction(postData));
      }
    };

    useEffect(() => {
      if (hideDelegate === true) {
        setDropdownValue("RE-DELEGATE");
      } else {
        setDropdownValue("DELEGATE");
      }
    }, []);

    useEffect(() => {
      if (validatorListDataObj.description.identity !== '' && !avatar?.[validatorListDataObj?.description?.identity]) {
        dispatch(GetValidatorAvatarAction(validatorListDataObj.description.identity))
      }
    }, [])

    return (
      <>
        <Grid
          py="1rem"
          gridTemplateColumns=" 3.5rem 4rem 2fr 2fr 2fr 2fr"
          alignItems="center"
          borderBottom="1px solid"
          borderColor="border.500"
        >
           {
            validatorListDataObj.description.identity === '' || !avatar
            ?
            <MemoProfile height="2.5rem" width="2.5rem" />
            :
            <img src={avatar[validatorListDataObj.description.identity]?.them[0]?.pictures?.primary?.url} alt="" height="30" width="30" style={{ borderRadius: '20px' }}/>
          }
          <Flex
            justifyContent="center"
            alignItems="center"
            bg="bg.600"
            borderRadius="4rem"
            height="3rem"
            width="3rem"
          >
            <Text
              color="primary.700"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
              style={{ whiteSpace: "nowrap" }}
            >
              # {index + 1}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
              {validatorListDataObj.description.moniker}
            </Text>
          </Flex>

          <Text color="primary.700" fontSize="1.4rem" key={index}>
            {/* 1,190,255 (6.62%) */}
            {(validatorListDataObj.amount.value / 1000000).toFixed(2)}
          </Text>
          {/* <Text color="primary.700" fontSize="1.4rem">
          1,190,255 (6.62%)
        </Text> */}
          <Text color="primary.700" fontSize="1.4rem">
            {(JSON.parse(validatorListDataObj.commission.rate) * 100).toFixed(
              2
            )}
            %
          </Text>
          {/* <Text color="primary.700" fontSize="1.4rem">
          10.00%
        </Text>
        <Text color="primary.700" fontSize="1.4rem">
          100.00%
        </Text> */}
          <Text
            color="primary.500"
            fontSize="1.4rem"
            cursor="pointer"
            fontWeight="medium"
            onClick={toggle}
          >
            {dropdownValue}
          </Text>
        </Grid>
        {visible && (
          <Modal
            isOpen={visible}
            onRequestClose={!loading ? hide : undefined}
            ariaHideApp={false}
          >
            <ModalClose
              onClick={!loading ? hide : undefined}
              loading={loading}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {() => {
                return (
                  <Box>
                    <Flex alignItems="center" ml="2rem">
                      <Text
                        variant="title"
                        fontWeight="medium"
                        color="primary.700"
                        py="2rem"
                        mr="1rem"
                      >
                        {dropdownValue}{" "}
                        {dropdownValue === "UNBOND" ? "from" : "to"}
                      </Text>
                      <Text
                        variant="body"
                        fontWeight="medium"
                        color="primary.500"
                        mr="1rem"
                      >
                        {validatorListDataObj.description.moniker}
                      </Text>
                      <HelpTooltip />
                    </Flex>
                    {!delegate ? (
                      <Box mr="10rem" ml="2rem">
                        <Grid gridTemplateColumns="15rem 1fr">
                          <Text
                            variant="label"
                            fontWeight="medium"
                            color="grey.700"
                            textTransform="uppercase"
                          >
                            Operator Address
                          </Text>
                          <Text
                            variant="body"
                            fontWeight="medium"
                            color="grey.900"
                            pb="1rem"
                          >
                            {encodeToBech32(
                              validatorListDataObj.address,
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
                            Commision Rate
                          </Text>
                          <Text
                            variant="body"
                            fontWeight="medium"
                            color="grey.900"
                            m={0}
                            pb="1rem"
                          >
                            {JSON.parse(
                              validatorListDataObj.commission.rate * 100
                            ).toFixed(2)}
                            % (Updated at{" "}
                            {moment(
                              validatorListDataObj.commission.updated_at
                            ).format("MM-DD-YYYY hh:mm:ss")}
                            )
                          </Text>
                        </Grid>
                        {/* <Grid gridTemplateColumns="15rem 1fr">
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
                         {validatorListDataObj.amount.value}
                        </Text>
                      </Grid> */}

                        <Form>
                          <Box my="2rem" mr="10rem">
                            {dropdownValue === "RE-DELEGATE" && (
                              <Box>
                                <Flex alignItems="center">
                                  <Text
                                    variant="label"
                                    fontWeight="medium"
                                    color="grey.700"
                                    textTransform="uppercase"
                                    mr="1rem"
                                  >
                                    TO VALIDATOR
                                  </Text>
                                  <HelpTooltip />
                                </Flex>
                                <FormInput
                                  name="toValidator"
                                  label="Enter To Validator Address"
                                  autofocus
                                />
                                <ErrorMessage
                                  name="toValidator"
                                  component={Error}
                                />
                              </Box>
                            )}
                            <Box>
                              <Flex alignItems="center">
                                <Text
                                  variant="label"
                                  fontWeight="medium"
                                  color="grey.700"
                                  textTransform="uppercase"
                                  mr="1rem"
                                >
                                  TOKEN AMOUNT
                                </Text>
                                <HelpTooltip />
                              </Flex>
                              <FormInput
                                name="amount"
                                label="Enter Token Amount"
                                autofocus
                              />
                              <ErrorMessage name="amount" component={Error} />
                            </Box>
                            <Box>
                              <Text
                                variant="label"
                                fontWeight="medium"
                                color="grey.700"
                                textTransform="uppercase"
                              >
                                Memo
                              </Text>
                              <FormInput
                                as="textarea"
                                rows="3"
                                name="memo"
                                label="Enter Memo"
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
                                Password
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
                              loading={loading}
                              disabled={loading}
                            >
                              {dropdownValue}
                            </Button>
                          </Box>
                        </Form>
                      </Box>
                    ) : (
                      <Box m="5rem">
                        <Grid justifyContent="center" alignItems="center">
                          <Flex
                            height="10rem"
                            width="10rem"
                            borderRadius="5rem"
                            border="5px solid"
                            borderColor="green.500"
                            mx="auto"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <MemoCheck height="5rem" width="5rem" />
                          </Flex>
                          <Text
                            variant="label"
                            fontWeight="semiBold"
                            color="grey.700"
                            textAlign="center"
                            mt="3rem"
                          >
                            Tx#:
                            <Text as="span" variant="field" color="grey.900">
                              {txHash}
                            </Text>
                          </Text>
                          <Text
                            variant="label"
                            fontWeight="semiBold"
                            color="grey.700"
                            textAlign="center"
                            my="2rem"
                            cursor="pointer"
                            onClick={() =>
                              window.open(`http://explorer.sentinel.co/transactions/${txHash}`)
                            }
                          >
                            Go to Explorer
                          </Text>
                          <Button
                            variant="secondary"
                            px="3rem"
                            justifySelf="center"
                            onClick={onCloseDelegate}
                          >
                            Close
                          </Button>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                );
              }}
            </Formik>
          </Modal>
        )}
      </>
    );
  }
);

export const Validators = React.memo(
  ({ visibleInActive, dropdownValue, hideDelegate, setDropdownValue }) => {
    const dispatch = useDispatch();
    const loadingValidator = useSelector(
      (state) => state.walletReducer.loadingValidator
    );
    let validatorListData = useSelector(
      (state) => state.walletReducer.validatorList
    );
    let saveDelegate = useSelector((state) => state.walletReducer.saveDelegate);
    let saveReDelegate = useSelector(
      (state) => state.walletReducer.saveReDelegate
    );
    let saveUnbond = useSelector((state) => state.walletReducer.saveUnbond);
    const [txHash, setTxHash] = useState("");
    const [delegate, setDelegate] = useState(false);
    const [validatorList, setValidatorList] = useState(null);
    const [orderTypeAsc, setOrderTypeAsc] = useState(true);
    const [orderValue, setOrderValue] = useState("voting");

    const { hide } = useVisibleState(false);

    const delegatehandler = () => {
      setDelegate(true);
    };

    const onCloseDelegate = () => {
      dispatch(ResetDRUAction());
      hide();
      setDelegate(false);
    };

    useEffect(() => {
      dispatch(GetValidatorListAction());
    }, [GetValidatorListAction])

    useEffect(() => {
      dispatch(GetAnAccountDetailsAction());
      if (saveDelegate !== null && saveDelegate.data.success === true) {
        hide();
        delegatehandler();
        setTxHash(saveDelegate.data.result.txhash);
      } else if (
        saveReDelegate !== null &&
        saveReDelegate.data.success === true
      ) {
        hide();
        delegatehandler();
        setTxHash(saveReDelegate.data.result.txhash);
      } else if (saveUnbond !== null && saveUnbond.data.success === true) {
        hide();
        delegatehandler();
        setTxHash(saveUnbond.data.result.txhash);
      }
    }, [saveDelegate, saveReDelegate, saveUnbond]);

    useEffect(() => {
      if (
        validatorListData !== null &&
        validatorListData?.data?.result.length > 0
      ) {
        let ascSorting = sort(
          "amount.value",
          validatorListData.data.result,
          "asc"
        );
        setValidatorList(ascSorting);
      }
    }, [validatorListData]);

    const sortingHandler = (type) => {
      if (validatorList !== null && validatorList.length > 0) {
        if (type === "moniker") {
          setOrderTypeAsc(!orderTypeAsc);
          setOrderValue("moniker");
          let descSorting = sort(
            "description.moniker",
            validatorList,
            orderTypeAsc === true ? "desc" : "asc"
          );
          setValidatorList(descSorting);
        } else if (type === "voting") {
          setOrderTypeAsc(!orderTypeAsc);
          setOrderValue("voting");
          let ascSorting = sort(
            "amount.value",
            validatorList,
            orderTypeAsc === true ? "desc" : "asc"
          );
          setValidatorList(ascSorting);
        } else if (type === "commission") {
          setOrderTypeAsc(!orderTypeAsc);
          setOrderValue("commission");
          let ascSorting = sort(
            "commission.rate",
            validatorList,
            orderTypeAsc === true ? "desc" : "asc"
          );
          setValidatorList(ascSorting);
        }
      }
    };

    return (
      <Box mr="1rem">
        <Grid py="1.5rem" gridTemplateColumns=" 3.5rem 4rem 2fr 2fr 2fr 2fr">
          <Box />
          <Box />
          <Box py={4}>
            <Text
              color="text.500"
              fontWeight="medium"
              fontSize="1.3rem"
              textTransform="uppercase"
              cursor="pointer"
              onClick={() => sortingHandler("moniker")}
            >
              MONIKER{" "}
              {orderValue === "moniker" ? (
                orderTypeAsc ? (
                  <Box as="span" fontSize="1rem">
                    &#9660;
                  </Box>
                ) : (
                  <Box as="span" fontSize="1rem">
                    &#x25B2;
                  </Box>
                )
              ) : (
                <Box as="span" fontSize="1rem" color="#ddd">
                  &#9660;
                </Box>
              )}
            </Text>
          </Box>
          <Box py={4}>
            <Text
              color="text.500"
              fontWeight="medium"
              fontSize="1.3rem"
              textTransform="uppercase"
              cursor="pointer"
              onClick={() => sortingHandler("voting")}
            >
              VOTING POWER{" "}
              {orderValue === "voting" ? (
                orderTypeAsc ? (
                  <Box as="span" fontSize="1rem">
                    &#9660;
                  </Box>
                ) : (
                  <Box as="span" fontSize="1rem">
                    &#x25B2;
                  </Box>
                )
              ) : (
                <Box as="span" fontSize="1rem" color="#ddd">
                  &#9660;
                </Box>
              )}
            </Text>
          </Box>

          {/* <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            SELF
          </Text>
        </Box> */}

          <Box py={4}>
            <Text
              color="text.500"
              fontWeight="medium"
              fontSize="1.3rem"
              textTransform="uppercase"
              cursor="pointer"
              onClick={() => sortingHandler("commission")}
            >
              COMMISSION{" "}
              {orderValue === "commission" ? (
                orderTypeAsc ? (
                  <Box as="span" fontSize="1rem">
                    &#9660;
                  </Box>
                ) : (
                  <Box as="span" fontSize="1rem">
                    &#x25B2;
                  </Box>
                )
              ) : (
                <Box as="span" fontSize="1rem" color="#ddd">
                  &#9660;
                </Box>
              )}
            </Text>
          </Box>
          {/* <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            UPTIME
          </Text>
        </Box> */}
          <Box py={4} />
        </Grid>
        <Loader loading={loadingValidator} relative>
          {/* {loadingValidator ? (
          <SentinelLoader />
        ) : ( */}
          <Grid gridGap="1rem" maxHeight="61vh" className="scroll-bar">
            {!visibleInActive &&
              validatorList !== null &&
              validatorList.length > 0 &&
              validatorList.map((obj, index) => {
                if (obj.jailed === false && obj.bond_status === "Bonded") {
                  return (
                    <ValidatorsList
                      key={index}
                      index={index}
                      validatorListData={obj}
                      dropdownValue={dropdownValue}
                      hideDelegate={hideDelegate}
                      setDropdownValue={setDropdownValue}
                      txHash={txHash}
                      onCloseDelegate={onCloseDelegate}
                      delegate={delegate}
                    />
                  );
                }
              })}
            {visibleInActive &&
              validatorList !== null &&
              validatorList.length > 0 &&
              validatorList.map((obj, index) => {
                if (obj.jailed === true && obj.bond_status !== "Bonded") {
                  return (
                    <ValidatorsList
                      key={index}
                      index={index}
                      validatorListData={obj}
                      dropdownValue={dropdownValue}
                      hideDelegate={hideDelegate}
                      setDropdownValue={setDropdownValue}
                      txHash={txHash}
                      onCloseDelegate={onCloseDelegate}
                      delegate={delegate}
                    />
                  );
                } else {
                }
              })}
          </Grid>
          {/* )} */}
        </Loader>
      </Box>
    );
  }
);
