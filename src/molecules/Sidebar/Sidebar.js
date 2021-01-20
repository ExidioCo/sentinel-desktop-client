import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  UpdateConfigAction,
  CheckConfigSettingAction,
} from "../../pages/Login/actions/LoginActions";

import {
  Box,
  Grid,
  Text,
  Flex,
  CustomNavLink,
  Button,
  Modal,
  Error,
  ModalClose,
  Chip,
} from "atoms";
import { FormInput } from "molecules/FormInput";
import MemoProfile from "assets/icons/Profile";
import MemoArrowBottom from "assets/icons/ArrowBottom";
import MemoLock from "assets/icons/Lock";
import MemoWallet from "assets/icons/Wallet";
import MemoActiveBorder from "assets/icons/ActiveBorder";
import MemoArrowLeft from "assets/icons/ArrowLeft";
import MemoArrowRight from "assets/icons/ArrowRight";
import useVisibleState from "hooks/useVisibleStates";
import { DropdownFilter } from "molecules/DropdownFilter";
import MemoSetting from "assets/icons/Setting";
import MemoHelp from "assets/icons/Help";
import { ConnectionStatus } from "molecules/ConnectionStatus";
import MemoLogo from "assets/icons/Logo";
import { ConfigureSettingForm } from "templates/ConfigureSettingForm";

const sidebarLinks = [
  { Icon: MemoLock, name: "dVPN", url: "/dashboard/dVPN" },
  { Icon: MemoWallet, name: "Wallet", url: "/dashboard/wallet" },
];

const BoxStyle = styled(Box)`
  &:hover,
  :focus,
  :active {
    background-color: #129eed;
    color: white;
    svg path {
      color: white;
      fill: white !important;
    }
  }
`;

const validationSchema = Yup.object({
  fee: Yup.string().required("Required"),
  gas_amount: Yup.string()
    .matches(/^[0-9]*$/, "Only Numbers allowed")
    .required("Required"),
  chain_id: Yup.string().required("Required"),
  rpc_address: Yup.string().required("Required"),
});

const DropdownItem = ({ name, bg, color }) => {
  return (
    <BoxStyle px="1.5rem" py="1rem" cursor="pointer" bg={bg} color={color}>
      <Text width="100%" fontSize="1.4rem" fontWeight="medium">
        {name}
      </Text>
    </BoxStyle>
  );
};

export const MyAccountDropdown = ({ name, accountDetails }) => {
  const dispatch = useDispatch();
  const configDetails = useSelector(
    (state) => state.loginReducer.checkConfigDetails
  );
  const keysDetails = useSelector(
    (state) => state.loginReducer.checkKeysDetails
  );

  const [dropdown, setDropdown] = useState(false);
  const { visible, hide, toggle } = useVisibleState(false);

  const [brodcastMode, setVariant] = useState(
    configDetails.data !== undefined
      ? {
          Block:
            configDetails.data.result.chain.broadcast_mode === "block"
              ? "selected"
              : "primary",
          Sync:
            configDetails.data.result.chain.broadcast_mode === "sync"
              ? "selected"
              : "primary",
          Async:
            configDetails.data.result.chain.broadcast_mode === "async"
              ? "selected"
              : "primary",
        }
      : {
          Block: "primary",
          Sync: "primary",
          Async: "primary",
        }
  );

  const [rpcServer, setRpcServer] = useState(
    configDetails.data !== undefined &&
      configDetails.data.result.chain.trust_node === true
      ? true
      : false
  );

  const [initialValues, setInitialValues] = useState(
    configDetails.data !== undefined
      ? {
          fee: configDetails.data.result.chain.fees,
          gas_amount: configDetails.data.result.chain.gas,
          chain_id: configDetails.data.result.chain.id,
          rpc_address: configDetails.data.result.chain.rpc_address,
        }
      : {
          fee: "",
          gas_amount: "",
          chain_id: "",
          rpc_address: "",
        }
  );

  useEffect(() => {
    dispatch(CheckConfigSettingAction());
    let configDataObj = configDetails?.data?.result.chain;
    let fromName = keysDetails?.data?.result[0].name;
    let chainObj = {
      broadcast_mode: configDataObj.broadcast_mode,
      fees: configDataObj.fees,
      gas_adjustment: configDataObj.gas_adjustment,
      gas_prices: configDataObj.gas_prices,
      gas: JSON.parse(configDataObj.gas),
      id: configDataObj.id,
      rpc_address: configDataObj.rpc_address,
      simulate_and_execute: configDataObj.simulate_and_execute,
      trust_node: configDataObj.trust_node,
    };
    let postData = {
      from: fromName,
      chain: chainObj,
    };
    dispatch(UpdateConfigAction(postData));
  }, []);

  const resetVariant = () => {
    setVariant({
      Block: "primary",
      Sync: "primary",
      Async: "primary",
    });
  };

  const setVariantType = (type) => {
    setVariant({
      Block: type === "Block" ? "selected" : "primary",
      Sync: type === "Sync" ? "selected" : "primary",
      Async: type === "Async" ? "selected" : "primary",
    });
  };

  const brodcastModeHandler = (e, type) => {
    e.preventDefault();
    if (type === "Block") {
      let variantType = brodcastMode.Block;
      if (variantType === "primary") {
        setVariantType("Block");
      } else {
        resetVariant();
      }
    } else if (type === "Sync") {
      let variantType = brodcastMode.Sync;
      if (variantType === "primary") {
        setVariantType("Sync");
      } else {
        resetVariant();
      }
    } else if (type === "Async") {
      let variantType = brodcastMode.Async;
      if (variantType === "primary") {
        setVariantType("Async");
      } else {
        resetVariant();
      }
    }
  };

  const rpcServerHandler = (e) => {
    e.preventDefault();
    setRpcServer(!rpcServer);
  };

  const findBrodcastMode = () => {
    if (brodcastMode.Block === "selected") {
      return "block";
    } else if (brodcastMode.Sync === "selected") {
      return "sync";
    } else if (brodcastMode.Async === "selected") {
      return "async";
    }
  };

  const onSubmit = (values, submitProps) => {
    let chainObj = {
      broadcast_mode: findBrodcastMode(),
      fees: `${values.fee > 0 ? values.fee + "tsent" : ""}`,
      gas_adjustment: 0,
      gas_prices: "0.01tsent",
      gas: JSON.parse(values.gas_amount),
      id: values.chain_id,
      rpc_address: values.rpc_address,
      simulate_and_execute: true,
      trust_node: rpcServer,
    };
    let postData = {
      from: "",
      chain: chainObj,
    };
    dispatch(UpdateConfigAction(postData));
    hide();
  };

  const openSettingHandler = () => {
    setDropdown(false);
    toggle();
  };

  return (
    <>
      <DropdownFilter
        render={
          <Grid width="15rem">
            {accountDetails !== undefined &&
              accountDetails.length > 0 &&
              accountDetails.map((obj, index) => {
                return (
                  <DropdownItem
                    name={obj.name.toUpperCase()}
                    key={index}
                    bg={index === 0 ? "primary.500" : ""}
                    color={index === 0 ? "white" : ""}
                  />
                );
              })}
            <BoxStyle
              px="1.5rem"
              py="1rem"
              cursor="pointer"
              color="grey.700"
              onClick={openSettingHandler}
            >
              <Grid
                gridAutoFlow="column"
                justifyContent="start"
                alignItems="center"
                gridGap=".5rem"
              >
                <MemoSetting height="1.8rem" width="1.8rem" fill="#8EA1C8" />
                <Text width="100%" fontSize="1.4rem" fontWeight="medium">
                  SETTINGS
                </Text>
              </Grid>
            </BoxStyle>
          </Grid>
        }
        onClose={() => setDropdown(false)}
        open={dropdown}
        onOpen={() => setDropdown(true)}
      >
        <Flex alignItems="center" py="1rem">
          <Grid
            gridAutoFlow="column"
            alignItems="center"
            justifyContent="center"
          >
            <MemoProfile height="2rem" width="2rem" />
            <Flex
              opacity={name ? 1 : 0}
              transition="all 1s"
              alignItems="center"
            >
              {name && (
                <>
                  <Text
                    fontWeight="medium"
                    variant="field"
                    color="primary.700"
                    whiteSpace="nowrap"
                    mx="1rem"
                  >
                    {name}
                  </Text>
                  <MemoArrowBottom height=".8rem" width="1rem" />
                </>
              )}
            </Flex>
          </Grid>
        </Flex>
      </DropdownFilter>
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
          <Grid gridTemplateColumns="auto auto">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {(formik) => {
                return (
                  <Form>
                    <Grid
                      gridTemplateColumns="auto"
                      gridGap="5rem"
                      alignItems="center"
                      px="4rem"
                    >
                      <Box mb="4rem">
                        <Text
                          as="h3"
                          variant="heading3"
                          color="primary.700"
                          textAlign="center"
                        >
                          Configure Settings
                        </Text>
                        <Grid
                          gridTemplateColumns="1fr 1fr"
                          gridGap="3rem"
                          mt="5rem"
                        >
                          <Box>
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
                              <Chip
                                variant={brodcastMode.Block}
                                text="Block"
                                onClick={(e) => brodcastModeHandler(e, "Block")}
                              />
                              <Chip
                                variant={brodcastMode.Sync}
                                text="Sync"
                                onClick={(e) => brodcastModeHandler(e, "Sync")}
                              />
                              <Chip
                                variant={brodcastMode.Async}
                                text="Async"
                                onClick={(e) => brodcastModeHandler(e, "Async")}
                              />
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
                                  Enter Gas
                                </Text>
                                <MemoHelp height="1.3rem" width="1.3rem" />
                              </Flex>
                              <FormInput
                                name="gas_amount"
                                label="Enter Gas Amount"
                              />
                              <ErrorMessage
                                name="gas_amount"
                                component={Error}
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Box>
                              <Flex alignItems="center" mb="1rem">
                                <Text
                                  variant="label"
                                  fontWeight="medium"
                                  color="grey.700"
                                  textTransform="uppercase"
                                  mr=".5rem"
                                >
                                  Enter Chain ID
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
                              <Chip
                                variant={
                                  rpcServer === true ? "selected" : "primary"
                                }
                                text="Yes"
                                onClick={(e) => rpcServerHandler(e)}
                              />
                              <Chip
                                variant={
                                  rpcServer === false ? "selected" : "primary"
                                }
                                text="No"
                                onClick={(e) => rpcServerHandler(e)}
                              />
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
                                  Enter RPC Server Address
                                </Text>
                                <MemoHelp height="1.3rem" width="1.3rem" />
                              </Flex>
                              <FormInput
                                name="rpc_address"
                                label="RPC Address"
                              />
                              <ErrorMessage
                                name="rpc_address"
                                component={Error}
                              />
                            </Box>
                          </Box>
                        </Grid>
                        <Button px="8rem" justifySelf="center" type="submit">
                          SAVE
                        </Button>
                      </Box>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
            <Box />
          </Grid>
        </Modal>
      )}
    </>
  );
};

export const Sidebar = ({ connect }) => {
  const { visible, toggle } = useVisibleState(true);
  let accountDetails = useSelector(
    (state) => state.loginReducer.checkKeysDetails
  );
  accountDetails = accountDetails?.data?.result;
  useEffect(() => {}, []);

  return (
    <Box
      bg="primary.600"
      height="100vh"
      textAlign="center"
      width={visible ? "17vw" : "8rem"}
      transition="all 0.3s"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bg="primary.500"
        borderRadius="3rem"
        height="3rem"
        width="3rem"
        zIndex={2}
        right="-1.5rem"
        top="1.5rem"
        cursor="pointer"
        onClick={toggle}
      >
        {visible ? (
          <MemoArrowLeft height="1rem" fill="white" />
        ) : (
          <MemoArrowRight height="1rem" fill="white" />
        )}
      </Flex>
      <Box bg="white" p="2rem">
        <Grid gridAutoFlow="column" justifyContent="center" alignItems="center">
          <MyAccountDropdown
            name={
              visible &&
              accountDetails !== undefined &&
              accountDetails.length > 0
                ? accountDetails[0]?.name.toUpperCase()
                : undefined
            }
            accountDetails={accountDetails}
          />
        </Grid>
      </Box>
      <Box>
        {sidebarLinks.map(({ Icon, name, url }) => (
          <CustomNavLink to={url}>
            {(isActive) => (
              <Grid
                gridTemplateColumns={visible ? "5rem 1fr" : "3rem 1fr"}
                alignItems="center"
              >
                {isActive ? (
                  <MemoActiveBorder
                    height="4.3rem"
                    width=".5rem"
                    alignSelf="start"
                  />
                ) : (
                  <Box width=".5rem" />
                )}
                <Flex alignItems="center" py="2rem">
                  <Icon
                    height="2rem"
                    width="2rem"
                    fill={isActive ? "white" : "#55678B"}
                  />
                  {visible && (
                    <Text
                      variant="field"
                      fontWeight="medium"
                      color={isActive ? "white" : "#55678B"}
                      px="2rem"
                    >
                      {name}
                    </Text>
                  )}
                </Flex>
              </Grid>
            )}
          </CustomNavLink>
        ))}
      </Box>
      {connect && visible && window.location.pathname === "/dashboard/dVPN" ? (
        <ConnectionStatus />
      ) : (
        <Box position="absolute" bottom="2rem" m="auto" left={0} right={0}>
          <MemoLogo height="4rem" />
        </Box>
      )}
    </Box>
  );
};
