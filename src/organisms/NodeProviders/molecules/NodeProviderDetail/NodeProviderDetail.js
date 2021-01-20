import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Grid, Text } from "atoms";
import { NodeProvidersList } from "../NodeProvidersList/NodeProvidersList";
// import { NodeProvidersSubscribedList } from "../NodeProvidersSubscribedList";
import { MapViewNodeProviderList } from "../MapViewNodeProviderList/";
import { MapViewNodeProviders } from "../MapViewNodeProviders";

import { GetProvidersAction } from '../../../../pages/Dashboard/Dvpn/actions/DvpnActions';

export const NodeProviderDetail = ({
  connect,
  setConnect,
  visibleMapView,
  subscribe,
  setSubscribe,
}) => {
  const dispatch = useDispatch();
  const providersData = useSelector(state => state.dvpnReducer.providersData);

  useEffect(() => {
    dispatch(GetProvidersAction());
  }, [])
  
  return (
    <>
      {visibleMapView ? (
        <Box mr="1rem">
          <Grid
            pt="2rem"
            px="3rem"
            gridTemplateColumns="1fr 10rem 1fr 1fr 1fr "
            borderBottom="1px solid"
            borderColor="border.500"
          >
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
                PLAN
              </Text>
            </Box>

            <Box py={4}>
              <Text
                color="text.500"
                fontWeight="medium"
                fontSize="1.3rem"
                textTransform="uppercase"
              >
                {connect ? "ACTIVE NODES" : "Website"}
              </Text>
            </Box>

            <Box py={4}>
              <Text
                color="text.500"
                fontWeight="medium"
                fontSize="1.3rem"
                textTransform="uppercase"
              >
                {connect ? "NODES" : "Description"}
              </Text>
            </Box>
            <Box py={4}>
              <Text
                color="text.500"
                fontWeight="medium"
                fontSize="1.3rem"
                textTransform="uppercase"
              >
                {connect && "VIEW NODES"}
              </Text>
            </Box>
          </Grid>

          <Grid>
            <Box maxHeight="72vh" className="scroll-bar">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <NodeProvidersList
                  connect={connect}
                  setConnect={setConnect}
                  setSubscribe={setSubscribe}
                  key={index}
                />
              ))}
            </Box>
          </Grid>
        </Box>
      ) : (
        <>
          <Box
            mt="3rem"
            mx="3rem"
            border="1px solid "
            borderColor="border.500"
            height="56vh"
          >
            <MapViewNodeProviders />
          </Box>
          <Box mt="1rem" mx="3rem" maxHeight="18vh" className="scroll-bar">
            {[1, 2, 3, 4, 5].map((index) => (
              <MapViewNodeProviderList
                connect={connect}
                setConnect={setConnect}
                visibleMapView={visibleMapView}
                key={index}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};
