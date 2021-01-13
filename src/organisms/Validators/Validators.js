import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import bech32 from 'bech32';
import moment from 'moment';

import MemoProfile from "assets/icons/Profile";
import { Box, Grid, Text, Flex, Modal, Error, ModalClose, Button } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import MemoHelp from "assets/icons/Help";
import { FormInput } from "molecules/FormInput";
import MemoCheck from "assets/icons/Check";

import {
  GetValidatorListAction,
  GetValidatorAvatarAction,
  PostDelegateAction,
  PostReDelegateAction,
  PostUnbondAction,
  GetAnAccountDetailsAction,
  resetSaveDelegate
} from '../../pages/Dashboard/Wallet/actions/WalletActions';
import {encodeToBech32} from "../../utils/utility";

const initialValues = {
  amount: "",
  password: "",
  toValidator: ""
};
const validationSchema = Yup.object({
  amount: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  // toValidator: Yup.string().required("Required"),
});

const ValidatorsList = React.memo(({
  index, validatorListData, dropdownValue,
  hideDelegate, setDropdownValue, txHash,
  onCloseDelegate, delegate,
}) => {
  const dispatch = useDispatch();
  let address = useSelector(state => state.loginReducer.checkKeysDetails.data.result[0].address);
  let avatar = useSelector(state => state.walletReducer.validatorAvatar);
  let accountDetails = useSelector(state => state.walletReducer.accountDetails);
  let validatorListDataObj = validatorListData;

  const { visible, hide, toggle } = useVisibleState(false);


  const onSubmit = (values, submitProps) => {
    let amount = {
      "denom": accountDetails?.data?.result?.coins[0].denom,
      "value": JSON.parse(values.amount)
    }
    let postData = {
      "address": address,
      "password": values.password,
      "amount": amount,
    }
    if (dropdownValue === 'DELEGATE') {
      postData['to'] = validatorListDataObj.address;
      dispatch(PostDelegateAction(postData))
    } else if (dropdownValue === 'RE-DELEGATE') {
      postData['from'] = validatorListDataObj.address;
      postData['to'] = values.toValidator;
      dispatch(PostReDelegateAction(postData))
    } else if (dropdownValue === 'UNBOND') {
      postData['from'] = validatorListDataObj.address
      dispatch(PostUnbondAction(postData))
    }
  };

  useEffect(() => {
    if (hideDelegate === true) {
      setDropdownValue('RE-DELEGATE')
    } else {
      setDropdownValue('DELEGATE')
    }
  }, [])

  // useEffect(() => {
  //   if (validatorListDataObj.description.identity !== '') {
  //     dispatch(GetValidatorAvatarAction(validatorListDataObj.description.identity))
  //   }
  // }, [])

  return (
    <>
      <Grid
        py="1rem"
        gridTemplateColumns="2fr 2fr 2fr 2fr"
        alignItems="center"
        borderBottom={index < 3 ? "1px solid" : "none"}
        borderColor="border.500"
      >
        <Flex alignItems="center">
          {/* {
            validatorListDataObj.description.identity === ''
            ?
            <MemoProfile height="2.5rem" width="2.5rem" />
            :
            <img src={avatar?.data.them[0].pictures.primary.url} alt="" height="30" width="30" style={{ borderRadius: '20px' }}/>
          } */}
          <MemoProfile height="2.5rem" width="2.5rem" />

          <Text
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            ml="1rem"
          >
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
          {(JSON.parse(validatorListDataObj.commission.rate) * 100).toFixed(2)}%
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
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
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
                      {dropdownValue} to
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="primary.500"
                      mr="1rem"
                    >
                      {validatorListDataObj.description.moniker}
                    </Text>
                    <MemoHelp height="1.5rem" width="1.5rem" />
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
                          {encodeToBech32(validatorListDataObj.address, 'sentvaloper')}
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
                          {JSON.parse(validatorListDataObj.commission.rate).toFixed(2)}% (Updated at {moment(validatorListDataObj.commission.updated_at).format('MM-DD-YYYY hh:mm:ss')})
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
                          {dropdownValue === "RE-DELEGATE" &&
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
                                <MemoHelp height="1.5rem" width="1.5rem" />
                              </Flex>
                              <FormInput name="toValidator" label="To Validator" />
                              <ErrorMessage name="toValidator" component={Error} />
                            </Box>
                          }
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
                              <MemoHelp height="1.5rem" width="1.5rem" />
                            </Flex>
                            <FormInput name="amount" label="Token Amount" />
                            <ErrorMessage name="amount" component={Error} />
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
                        {/*  <Text*/}
                        {/*    variant="label"*/}
                        {/*    fontWeight="semiBold"*/}
                        {/*    color="grey.700"*/}
                        {/*    textAlign="center"*/}
                        {/*    my="2rem"*/}
                        {/*  >*/}
                        {/*    Go to Explorer*/}
                        {/*</Text>*/}
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
});

export const Validators = React.memo(({ visibleInActive, dropdownValue, hideDelegate, setDropdownValue }) => {

  const dispatch = useDispatch();

  const validatorList = useSelector(state => state.walletReducer.validatorList);
  let saveDelegate = useSelector(state => state.walletReducer.saveDelegate);
  const [txHash, setTxHash] = useState('');
  const [delegate, setDelegate] = useState(false);

  const { hide } = useVisibleState(false);

  const delegatehandler = () => {
    setDelegate(true);
  };

  const onCloseDelegate = () => {
    hide();
    setDelegate(false);
    dispatch(resetSaveDelegate());
  };

  useEffect(() => {
    dispatch(GetValidatorListAction());
    dispatch(GetAnAccountDetailsAction());
    if (saveDelegate !== null && saveDelegate.data.success === true) {
      hide();
      delegatehandler();
      setTxHash(saveDelegate.data.result.txhash)
    }
  }, [saveDelegate])

  return (
    <Box mr="1rem">
      <Grid py="1.5rem" gridTemplateColumns="2fr 2fr 2fr 2fr">
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            MONIKER
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            VOTING POWER
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
          >
            COMMISSION
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

      <Grid gridGap="1rem" maxHeight="66vh" className="scroll-bar">
        {
          !visibleInActive && validatorList?.data.result.length > 0 && validatorList.data.result.map((obj, index) => {
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
            )
          })
        }
        {
          visibleInActive && validatorList?.data.result.length > 0 && validatorList.data.result.map((obj, index) => {
            if (obj.jailed === true) {
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
              )
            }
          })
        }
      </Grid>
    </Box>
  );
});
