import { useState } from "react";

import { Box, Grid, Flex, Button } from "atoms";
// import SearchField from "react-search-field";
import { NodeProviders } from "organisms/NodeProviders";
import { IndividualHost } from "organisms/IndividualHost";
import MemoProvider from "assets/icons/Provider";
import MemoHost from "assets/icons/Host";
import MemoListView from "assets/icons/ListView";
import MemoMapView from "assets/icons/MapView";
import MemoHeart from "assets/icons/Heart";
import { SessionHistory } from "pages/Dashboard/Dvpn/molecules/SessionHistory";

export const DvpnDetails = ({
  connect,
  setConnect,
  subscribe,
  setSubscribe,
  subscribedIndividual,
  setSubscribedIndividual,
}) => {
  const [visibleNodeProviderList, setVisibleNodeProviderList] = useState(true);
  const [visibleIndivisualHost, setVsibleIndivisualHost] = useState(false);
  const [visibleSessionHistory, setVisibleSessionHistory] = useState(false);
  const [visibleMapView, setVisibleMapView] = useState(false);

  const NodeProvidersHandler = () => {
    setVisibleNodeProviderList(true);
    setVsibleIndivisualHost(false);
    setVisibleSessionHistory(false);
  };
  const IndividualHostsHandler = () => {
    setVisibleNodeProviderList(false);
    setVsibleIndivisualHost(true);
    setVisibleSessionHistory(false);
  };
  const sessionHistoryHandler = () => {
    setVisibleNodeProviderList(false);
    setVsibleIndivisualHost(false);
    setVisibleMapView(false);
    setVisibleSessionHistory(true);
  };

  const listViewHandler = () => {
    setVisibleMapView(true);
  };
  const mapViewHandler = () => {
    setVisibleNodeProviderList(true);
    setVsibleIndivisualHost(false);
    setVisibleMapView(false);
  };

  const subscribeHandler = () => {
    setSubscribe(!subscribe);
    setSubscribedIndividual(!subscribedIndividual);
  };

  const WalletTabs = () => {
    if (visibleNodeProviderList === true) {
      return (
        <NodeProviders
          connect={connect}
          setConnect={setConnect}
          visibleMapView={visibleMapView}
          subscribe={subscribe}
          setSubscribe={setSubscribe}
        />
      );
    } else if (visibleIndivisualHost === true) {
      return (
        <IndividualHost
          connect={connect}
          setConnect={setConnect}
          subscribedIndividual={subscribedIndividual}
          setSubscribedIndividual={setSubscribedIndividual}
        />
      );
    } else if (visibleSessionHistory === true) {
      return <SessionHistory />;
    }
    return;
  };

  return (
    <Box pt="1rem">
      <Box px="3rem">
        <Grid
          gridAutoFlow="column"
          justifyContent="space-between"
          gridGap="2rem"
          alignItems="center"
        >
          <Flex>
            <Button
              variant={visibleNodeProviderList ? "primaryShadow" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={NodeProvidersHandler}
            >
              <Grid alignItems="center" gridAutoFlow="column" gridGap=".5rem">
                <MemoProvider
                  fill={visibleNodeProviderList ? "#55678B" : "#95A7CB"}
                />
                Node Providers
              </Grid>
            </Button>
            <Button
              variant={visibleIndivisualHost ? "primaryShadow" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={IndividualHostsHandler}
            >
              <Grid alignItems="center" gridAutoFlow="column" gridGap=".5rem">
                <MemoHost
                  fill={visibleNodeProviderList ? "#55678B" : "#95A7CB"}
                />
                Individual Hosts
              </Grid>
            </Button>
            <Button
              variant={visibleSessionHistory ? "primaryShadow" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={sessionHistoryHandler}
            >
              <Grid alignItems="center" gridAutoFlow="column" gridGap=".5rem">
                dVPN Session History
              </Grid>
            </Button>
          </Flex>
          <Grid
            gridGap="1rem"
            gridAutoFlow="column"
            justifyContent="end"
            alignItems="center"
          >
            {/* <SearchField
              placeholder="Search"
              onChange={onChangeHandler}
              classNames="search-container"
            /> */}

            {!visibleSessionHistory && (
              <MemoMapView
                fill={
                  !visibleMapView &&
                  !visibleIndivisualHost &&
                  !visibleSessionHistory
                    ? "#139EEE"
                    : "#95A7CB"
                }
                color={
                  !visibleMapView &&
                  !visibleIndivisualHost &&
                  !visibleSessionHistory
                    ? "#139EEE"
                    : "#95A7CB"
                }
                onClick={mapViewHandler}
                cursor="pointer"
              />
            )}
            {!visibleSessionHistory && (
              <MemoListView
                fill={
                  visibleMapView ||
                  visibleIndivisualHost ||
                  visibleSessionHistory
                    ? "#139EEE"
                    : "#95A7CB"
                }
                color={
                  visibleMapView ||
                  visibleIndivisualHost ||
                  visibleSessionHistory
                    ? "#139EEE"
                    : "#95A7CB"
                }
                onClick={listViewHandler}
                cursor="pointer"
              />
            )}
            {!visibleSessionHistory && (
              <Button
                variant={!subscribe ? "greyBorder" : "secondary"}
                px="1rem"
                justifySelf="center"
                textTransform="capitalize"
                onClick={subscribeHandler}
              >
                <Grid
                  alignItems="center"
                  gridAutoFlow="column"
                  gridGap=".5rem"
                  fontSize="1.2rem"
                  color={
                    !subscribe || !subscribedIndividual ? "grey.700" : "#129EED"
                  }
                  py=".2rem"
                  cursor="pointer"
                >
                  <MemoHeart
                    fill={
                      !subscribe || !subscribedIndividual
                        ? "#95A7CB"
                        : "#129EED"
                    }
                  />
                  Subscribed
                </Grid>
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <WalletTabs />
    </Box>
  );
};
