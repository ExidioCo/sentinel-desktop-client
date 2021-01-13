import { useSelector } from "react-redux";
import MemoLogo from "assets/icons/Logo";
import MemoSent from "assets/icons/Sent";
import { Box, Grid, Text, Flex } from "atoms";
import { SendReceiveToken } from "../SendReceiveToken";
import { Withdraw } from "../Withdraw";

export const Token = () => {
  let accountDetails = useSelector(state => state.loginReducer.checkKeysDetails);
  accountDetails = accountDetails?.data?.result 
  return (
    <Box>
      <Box p="2rem 3rem">
        <Text variant="field" fontWeight="medium" color="primary.700">
          {accountDetails[0].name.toUpperCase()}
        </Text>
        <Grid
          gridAutoFlow="column"
          justifyContent="space-between"
          alignItems="center"
          boxShadow="0px 4px 17px rgba(0, 0, 0, 0.08)"
          p=" 1rem"
          mt="1rem"
        >
          <Grid
            gridAutoFlow="column"
            gridGap="1rem"
            alignItems="center"
            justifyContent="start"
            cursor="pointer"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bg="bg.600"
              borderRadius="4rem"
              height="3rem"
              width="3rem"
              cursor="pointer"
            >
              <MemoLogo height="2rem" width="1.5rem" />
            </Flex>
            <Text
              variant="field"
              fontWeight="medium"
              color="primary.700"
              textTransform="uppercase"
              cursor="pointer"
              onClick={() => window.open('https://www.coingecko.com/en/coins/sentinel')}
            >
              SENTINEL
              <Text
                as="span"
                variant="small"
                fontWeight="medium"
                color="primary.700"
                textTransform="uppercase"
                ml=".5rem"
                cursor="pointer"
              >
                (SENT)
              </Text>
            </Text>
          </Grid>
          <Box>
            <MemoSent height="1rem" width="1rem" />
          </Box>
        </Grid>
      </Box>
      <SendReceiveToken />
      <Withdraw />
    </Box>
  );
};
