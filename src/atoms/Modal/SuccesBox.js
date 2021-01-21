import React from "react";

import {
  Box,
  Grid,
  Text,
  Flex,
  Button,
} from "atoms";
import MemoCheck from "assets/icons/Check";

export const SuccessBox = React.memo(
  ({ txHash, onCloseSuccess }) => {
    return (
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
          <Button
            variant="secondary"
            px="3rem"
            justifySelf="center"
            onClick={onCloseSuccess}
          >
            Close
          </Button>
        </Grid>
      </Box>
    );
  }
);

