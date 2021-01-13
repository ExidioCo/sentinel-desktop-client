import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Text, Flex, Grid, Button, Modal, Error, ModalClose } from "atoms";
import { FormSelect, FormInput } from "molecules/FormInput/FormInput";
import useVisibleState from "hooks/useVisibleStates";
import MemoHelp from "assets/icons/Help";

import { GetAllDelegationsAction, PostWithdrawRewardsAction } from '../../actions/WalletActions';
import {encodeToBech32} from "../../../../../utils/utility";

const initialValues = {
  validator: "",
};

const initialValuesModal = {
  memo: "",
  password: "",
};

const validationSchema = Yup.object({
  validator: Yup.string().required("Required"),
});

const validationSchemaWithdrawing = Yup.object({
  password: Yup.string().required("Required"),
});

const WithdrawForm = () => {
  const dispatch = useDispatch();
  const delegations = useSelector(state => state.walletReducer.allDelegations);
  const validatorList = useSelector(state => state.walletReducer.validatorList);
  const accountDetails = useSelector(state => state.walletReducer.accountDetails);
  const { visible, hide, toggle } = useVisibleState(false);
  const [formValues, setFormValues] = useState(null);
  const [withDrawelValueAddress, setWithDrawelAddress] = useState(null);
  const [selectedMoniker, setMoniker] = useState(null);

  useEffect(() => {
    dispatch(GetAllDelegationsAction())
  }, [GetAllDelegationsAction])

  let filteredOption = [];
  let options = []

  delegations?.data?.result.length > 0 &&  delegations?.data?.result.map((obj, index) => {
      let tempObj = {}
      tempObj["customAbbreviation"] = obj.validator_address
      filteredOption.push(tempObj)
  })

  let result = filteredOption.map(function(el) {
    var o = Object.assign({}, el);
    o.value = '';
    o.label = '';
    return o;
  })

  result.length > 0 && result.map((obj) => ({...obj, value: '', label: ''}))

  validatorList?.data?.result.length > 0 &&  validatorList?.data?.result.map((obj) => {
    return result.map((Childobj) => {
      if(Childobj.customAbbreviation === obj.address) {
        let temObj = {}
        temObj["customAbbreviation"] = obj.address;
        // temObj["value"] = { moniker: obj.description.moniker, address: obj.address};
        temObj["value"] = obj.address;
        temObj["label"] = obj.description.moniker;
        options.push(temObj)
      }
    })
  })

  const onSubmit = (values, submitProps) => {
    console.log(values);
    let postData = {
      memo: values.memo,
      password: values.password,
      address: accountDetails.data.result.address,
      validators: [withDrawelValueAddress]
    }
    dispatch(PostWithdrawRewardsAction(postData, withDrawelValueAddress));
    submitProps.resetForm();
    toggle();
  };

  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <Grid gridAutoFlow="column" gridGap="4rem" justifyContent="space-between">
      <Text variant="label" fontWeight="medium" color="text.500">
        {label}
      </Text>
      <Text variant="small" fontWeight="medium" color="primary.700">
        {encodeToBech32(customAbbreviation,'sentvaloper')}
      </Text>
    </Grid>
  );

  const onChangeHandler = value => {
    setWithDrawelAddress(value)
    let findMoniker = validatorList.data.result.filter(data => data.address === value);
    findMoniker = findMoniker[0].description.moniker;
    setMoniker(findMoniker)
  }

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => {
          return (
            <Form>
              <Box mx="3rem" mt="2rem">
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                  pb=".8rem"
                >
                  SELECT VALIDATOR TO WITHDRAW
                </Text>

                <FormSelect
                  name="validator"
                  formatOptionLabel={formatOptionLabel}
                  options={options}
                  onChange={(value) => onChangeHandler(value)}
                  searchable
                />
                <ErrorMessage name="validator" component={Error} />
              </Box>
              <Flex justifySelf="center">
                <Button px="3rem" m="auto" type="submit">
                  Withdraw
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
          <Formik
            initialValues={formValues || initialValuesModal}
            validationSchema={validationSchemaWithdrawing}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {() => {
              return (
                <Box mr="10rem" ml="1rem">
                  <Flex alignItems="center">
                    <Text
                      variant="title"
                      fontWeight="medium"
                      color="primary.700"
                      py="2rem"
                      mr="1rem"
                    >
                      WITHDRAWING FROM
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="primary.500"
                      mr="1rem"
                    >
                      {selectedMoniker}
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
                      FROM Address
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="grey.900"
                      pb="1rem"
                    >
                      {encodeToBech32(withDrawelValueAddress,'sentvaloper')}
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
                      8,317
                    </Text>
                  </Grid> */}

                  <Form>
                    <Box my="2rem" mr="10rem">
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
                        <FormInput name="memo" label="Enter Memo" />
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
                        WITHDRAW
                      </Button>
                    </Box>
                  </Form>
                </Box>
              );
            }}
          </Formik>
        </Modal>
      )}
    </>
  );
};

export const Withdraw = () => {
  return (
    <Box mt="3rem">
      <Text
        variant="field"
        fontWeight="medium"
        color="primary.700"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="border.500"
        textAlign="center"
        py="1rem"
      >
        Withdraw
      </Text>
      <WithdrawForm />
    </Box>
  );
};
