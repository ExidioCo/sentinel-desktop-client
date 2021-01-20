import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MemoTime from "assets/icons/Time";
import { Box, Text, Grid } from "atoms";
import ReactTooltip from "react-tooltip";

import { GetSessionOfAnAddressAction } from "../../actions/DvpnActions";

const SessionHistoryHeadings = ({ heading, title }) => {
  return (
    <Box>
      <Text
        variant="heading7"
        fontWeight="medium"
        color="primary.700"
        textAlign="center"
        py="1rem"
      >
        {heading}
      </Text>
      <Text
        variant="body"
        fontWeight="medium"
        color="primary.700"
        textAlign="center"
      >
        {title}
      </Text>
    </Box>
  );
};

const SessionHistoryList = () => {
  return (
    <Grid
      py="1.5rem"
      px="4rem"
      gridTemplateColumns=".8fr  1fr 1fr 3rem"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="border.500"
    >
      <Text color="primary.700" fontSize="1.3rem" fontWeight="medium">
        22
      </Text>

      <Text color="primary.700" fontSize="1.3rem" fontWeight="medium">
        45.4 MB
      </Text>
      <Text color="primary.700" fontSize="1.3rem" fontWeight="medium">
        5 min 34 secs
      </Text>
      {/* <MemoTime height="1.5rem" width="1.5rem" /> */}

      <div>
        <a data-for="soclose" data-tip="3">
          <MemoTime height="1.5rem" width="1.5rem" cursor="pointer" />
        </a>
      </div>
      <ReactTooltip
        id="soclose"
        getContent={(dataTip) => (
          <div>
            <p>Tue, 08 Sep 2020 19:07:11 GMT +5:30</p>
          </div>
        )}
        effect="solid"
        // delayHide={500}
        // delayShow={500}
        place="left"
        border={true}
        type="light"
      />
    </Grid>
  );
};

export const SessionHistory = () => {
  const dispatch = useDispatch();
  const sesionOfAnAddressDetails = useSelector(
    (state) => state.dvpnReducer.sessionOfAnAddressDetails
  );

  useEffect(() => {
    dispatch(GetSessionOfAnAddressAction());
  }, []);

  return (
    <Box>
      <Grid
        p="2rem"
        gridAutoFlow="column"
        justifyContent="space-around"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      >
        <SessionHistoryHeadings heading="22" title="Sessions" />
        <SessionHistoryHeadings heading="33.3hrs" title="Duration" />
        <SessionHistoryHeadings heading="2.5GB" title="Received" />
      </Grid>
      <Grid
        mt="1rem"
        px="4rem"
        gridTemplateColumns=".8fr 1fr 1fr 3rem"
        justifyContent="space-between"
      >
        <Box py={4}>
          <Text
            color="grey.700"
            fontWeight="medium"
            fontSize="1.1rem"
            textTransform="uppercase"
          >
            Session ID
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="grey.700"
            fontWeight="medium"
            fontSize="1.1rem"
            textTransform="uppercase"
          >
            Received Data
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="grey.700"
            fontWeight="medium"
            fontSize="1.1rem"
            textTransform="uppercase"
          >
            Duration
          </Text>
        </Box>

        <Box py={4} />
      </Grid>

      <Grid maxHeight="56vh" className="scroll-bar">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <SessionHistoryList key={index} />
        ))}
      </Grid>
    </Box>
  );
};
