import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Text, Box, Grid, Flex, Button } from "atoms";
import { SocialSecion } from "molecules/SocialSecion";
import MemoAddress from "assets/icons/Address";
import MemoSeed from "assets/icons/Seed";
import MemoAccept from "assets/icons/Accept"; 

export const AccountDetails = () => {

  const createdAccountDetails = useSelector(state => state.loginReducer.createAccount);

  console.log('createdAccountDetails-----', createdAccountDetails);
  let data = createdAccountDetails.data.result;
  let mnemonics = data.mnemonic;
  let mnemonicsArr = mnemonics.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
  console.log('mnemonicsArr ----', mnemonicsArr);
  return (
    <Grid gridTemplateRows="94vh 6vh">
      <Grid gridTemplateColumns="1fr 3fr 1fr" alignItems="center">
        <Box></Box>
        <Box>
          <Text
            as="h3"
            variant="heading3"
            color="primary.700"
            textAlign="center"
          >
            Account Created Successfully
          </Text>
          <Box mb="2rem">
            <Flex alignItems="center" pb="1rem">
              <Text
                variant="label"
                fontWeight="medium"
                color="grey.700"
                m={0}
                textTransform="uppercase"
                mr="1rem"
              >
                ADDRESS
              </Text>
              <Flex
                bg="grey.400"
                borderRadius="4rem"
                height="2.5rem"
                width="2.5rem"
                alignItems="center"
                justifyContent="center"
              >
                <MemoAddress height="1rem" />
              </Flex>
            </Flex>

            <Text as="p" variant="small" color="grey.900" m={0} pb="1rem">
              {data.address}
            </Text>
          </Box>
          <Box mb="2rem">
            <Flex alignItems="center" pb="1rem">
              <Text
                variant="label"
                fontWeight="medium"
                color="grey.700"
                m={0}
                textTransform="uppercase"
                mr="1rem"
              >
                Public key
              </Text>
              <Flex
                bg="grey.400"
                borderRadius="4rem"
                height="2.5rem"
                width="2.5rem"
                alignItems="center"
                justifyContent="center"
              >
                <MemoAddress height="1rem" />
              </Flex>
            </Flex>
            <Text as="p" variant="small" color="grey.900" m={0} pb="1rem">
              {data.pub_key}
            </Text>
          </Box>

          <Box>
            <Flex alignItems="center" pb="1rem">
              <Text
                variant="label"
                fontWeight="medium"
                color="grey.700"
                m={0}
                textTransform="uppercase"
                mr="1rem"
              >
                Seed
              </Text>
              <Flex
                bg="grey.400"
                borderRadius="4rem"
                height="2.5rem"
                width="2.5rem"
                alignItems="center"
                justifyContent="center"
              >
                <MemoSeed height="1rem" />
              </Flex>
            </Flex>
            <Grid
              border="1px dashed"
              borderColor="grey.700"
              gridTemplateColumns="repeat(8, auto [col-start])"
              gridGap="1rem"
              p="1rem"
            >
              {
                mnemonicsArr.length > 0 && mnemonicsArr.map((data, index) => {
                  return (
                    <Text key={index} as="p" variant="body" color="grey.900" m={0}>
                      {data}
                    </Text>
                  )
                })
              } 
            </Grid>
            <Text as="p" variant="small" color="grey.700">
              <Text
                as="span"
                variant="small"
                fontWeight="medium"
                color="grey.700"
                m={0}
                textTransform="uppercase"
                mr="1rem"
              >
                Note:
              </Text>
              Copy your keys to a secure location. Remember, we don't store any
              of your keys in our databases.
            </Text>
          </Box>
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
          <Grid gridAutoFlow="column" gridGap="2rem" alignItems="center">
            <Flex alignItems="center">
              <MemoAccept />
              <Text variant="small" color="black" fontWeight="medium" ml="1rem">
                I have secured the seed safely
              </Text>
            </Flex>
            <Link to="/dashboard/wallet">
              <Button px="3rem" justifySelf="center" type="submit">
                Continue
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
