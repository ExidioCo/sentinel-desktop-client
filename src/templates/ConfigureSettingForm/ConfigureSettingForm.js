import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Text, Box, Grid, Flex, Error, Button, Chip } from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";
import MemoHelp from "assets/icons/Help";
import { SocialSecion } from "molecules/SocialSecion";

import { UpdateConfigAction } from '../../pages/Login/actions/LoginActions';

const validationSchema = Yup.object({
  fee: Yup.string().required("Required"),
  gas_amount: Yup.string().required("Required"),
  chain_id: Yup.string().required("Required"),
  rpc_address: Yup.string().required("Required"),
});


export const ConfigureSettingForm = () => {

  const dispatch = useDispatch();

  const configDetails = useSelector(state => state.loginReducer.checkConfigDetails);

  const [brodcastMode, setVariant] = useState(
    configDetails.data !== undefined
      ?
      {
        Block: configDetails.data.result.chain.broadcast_mode === 'block' ? 'selected' : 'primary',
        Sync: configDetails.data.result.chain.broadcast_mode === 'sync' ? 'selected' : 'primary',
        Async: configDetails.data.result.chain.broadcast_mode === 'async' ? 'selected' : 'primary',
      }
      :
      {
        Block: 'primary',
        Sync: 'primary',
        Async: 'primary'
      }
  )

  const [rpcServer, setRpcServer] = useState(
    configDetails.data !== undefined && configDetails.data.result.chain.trust_node === true ? true : false
  )

  const [initialValues, setInitialValues] = useState(configDetails.data !== undefined ?
    {
      fee: configDetails.data.result.chain.fees,
      gas_amount: configDetails.data.result.chain.gas,
      chain_id: configDetails.data.result.chain.id,
      rpc_address: configDetails.data.result.chain.rpc_address,
    }
    :
    {
      fee: '',
      gas_amount: '',
      chain_id: '',
      rpc_address: '',
    }
  )

  const resetVariant = () => {
    setVariant({
      Block: 'primary',
      Sync: 'primary',
      Async: 'primary'
    })
  }

  const setVariantType = (type) => {
    setVariant({
      Block: type === 'Block' ? 'selected' : 'primary',
      Sync: type === 'Sync' ? 'selected' : 'primary',
      Async: type === 'Async' ? 'selected' : 'primary'
    })
  }

  const brodcastModeHandler = (e, type) => {
    e.preventDefault();
    if (type === "Block") {
      let variantType = brodcastMode.Block
      if (variantType === 'primary') {
        setVariantType('Block')
      } else {
        resetVariant();
      }
    } else if (type === "Sync") {
      let variantType = brodcastMode.Sync
      if (variantType === 'primary') {
        setVariantType('Sync')
      } else {
        resetVariant();
      }
    } else if (type === "Async") {
      let variantType = brodcastMode.Async
      if (variantType === 'primary') {
        setVariantType('Async')
      } else {
        resetVariant();
      }
    }
  }

  const rpcServerHandler = (e) => {
    e.preventDefault();
    setRpcServer(!rpcServer)
  }

  const findBrodcastMode = () => {
    if(brodcastMode.Block === "selected") {
      return 'block'
    } else if (brodcastMode.Sync === "selected") {
      return 'sync'
    } else if (brodcastMode.Async === "selected") {
      return 'async'
    }
  }

  const onSubmit = (values, submitProps) => {
    let chainObj = {
      broadcast_mode: findBrodcastMode(),
      fees: `${values.fee > 0 ? values.fee+ 'tsent' : ''}`,
      gas_adjustment: 0,
      gas_prices: '0.01tsent' ,
      gas: JSON.parse(values.gas_amount),
      id: values.chain_id,
      rpc_address: values.rpc_address,
      simulate_and_execute: true,
      trust_node: rpcServer
    }
    let postData = {
       from: '',
       chain: chainObj
    }
    dispatch(UpdateConfigAction(postData))
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Grid gridTemplateRows="94vh 6vh">
                <Grid
                  gridTemplateColumns="8rem 4fr 8rem"
                  gridGap="5rem"
                  alignItems="center"
                >
                  <Box />
                  <Box>
                    <Text
                      as="h3"
                      variant="heading3"
                      color="primary.700"
                      textAlign="center"
                    >
                      Configure Settings
                    </Text>
                    <Grid gridTemplateColumns="1fr 1fr">
                      <Box mt="5rem">
                        <Flex alignItems="center" mb="1rem">
                          <Text
                            variant="label"
                            fontWeight="medium"
                            color="grey.700"
                            textTransform="uppercase"
                            mr=".5rem"
                          >
                            Broadcast mode
                          </Text>
                          <MemoHelp height="1.3rem" width="1.3rem" />
                        </Flex>
                        <Grid
                          gridAutoFlow="column"
                          justifyContent="start"
                          gridGap="1rem"
                          mb="2rem"
                        >
                          <Chip variant={brodcastMode.Block} text="Block" onClick={(e) => brodcastModeHandler(e, 'Block')} />
                          <Chip variant={brodcastMode.Sync} text="Sync" onClick={(e) => brodcastModeHandler(e, 'Sync')} />
                          <Chip variant={brodcastMode.Async} text="Async" onClick={(e) => brodcastModeHandler(e, 'Async')} />
                        </Grid>
                        <Box>
                          <Flex alignItems="center" mb="1rem">
                            <Text
                              variant="label"
                              fontWeight="medium"
                              color="grey.700"
                              textTransform="uppercase"
                              mr=".5rem"
                            >
                              Fee
                            </Text>
                            <MemoHelp height="1.3rem" width="1.3rem" />
                          </Flex>
                          <FormInput name="fee" label="Enter Fee" />
                          <ErrorMessage name="fee" component={Error} />
                        </Box>
                        <Box>
                          <Flex alignItems="center" mb="1rem">
                            <Text
                              variant="label"
                              fontWeight="medium"
                              color="grey.700"
                              textTransform="uppercase"
                              mr=".5rem"
                            >
                              Gas
                            </Text>
                            <MemoHelp height="1.3rem" width="1.3rem" />
                          </Flex>
                          <FormInput
                            name="gas_amount"
                            label="Enter Gas Amount"
                          />
                          <ErrorMessage name="gas_amount" component={Error} />
                        </Box>
                      </Box>
                      <Box px="3rem" mt="5rem">
                        <Box>
                          <Flex alignItems="center" mb="1rem">
                            <Text
                              variant="label"
                              fontWeight="medium"
                              color="grey.700"
                              textTransform="uppercase"
                              mr=".5rem"
                            >
                              Chain ID
                            </Text>
                            <MemoHelp height="1.3rem" width="1.3rem" />
                          </Flex>
                          <FormInput name="chain_id" label="Chain Id" />
                          <ErrorMessage name="chain_id" component={Error} />
                        </Box>

                        <Flex alignItems="center" mb="1rem">
                          <Text
                            variant="label"
                            fontWeight="medium"
                            color="grey.700"
                            textTransform="uppercase"
                            mr=".5rem"
                          >
                            Trust RPC Server
                          </Text>
                          <MemoHelp height="1.3rem" width="1.3rem" />
                        </Flex>
                        <Grid
                          gridAutoFlow="column"
                          gridGap="1rem"
                          mb="2rem"
                          justifyContent="start"
                        >
                          <Chip variant={rpcServer === true ? "selected" : "primary"} text="Yes" onClick={(e) => rpcServerHandler(e)} />
                          <Chip variant={rpcServer === false ? "selected" : "primary"} text="No" onClick={(e) => rpcServerHandler(e)} />
                        </Grid>
                        <Box>
                          <Flex alignItems="center" mb="1rem">
                            <Text
                              variant="label"
                              fontWeight="medium"
                              color="grey.700"
                              textTransform="uppercase"
                              mr=".5rem"
                            >
                              RPC Server Address
                            </Text>
                            <MemoHelp height="1.3rem" width="1.3rem" />
                          </Flex>
                          <FormInput name="rpc_address" label="RPC Address" />
                          <ErrorMessage name="rpc_address" component={Error} />
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
                <Box
                  borderTop="1px solid "
                  borderColor="border.0"
                  alignSelf="end"
                  p="1rem 2rem "
                >
                  <Grid
                    gridAutoFlow="column"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <SocialSecion />
                    <Grid
                      gridAutoFlow="column"
                      gridGap="2rem"
                      alignItems="center"
                    >
                      <Button px="3rem" justifySelf="center" type="submit">
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
