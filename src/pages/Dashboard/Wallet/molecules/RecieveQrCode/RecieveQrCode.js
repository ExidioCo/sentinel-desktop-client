import { useSelector } from "react-redux";
import QRCode from 'qrcode.react';


import { Box, Text, Flex, Image } from "atoms";
import MemoAddress from "assets/icons/Address";
import { encodeToBech32 } from '../../../../../utils/utility';

export const RecieveQrCode = () => {
  let address = useSelector(state => state.loginReducer.checkKeysDetails.data.result[0].address);
  return (
    <Box textAlign="center">
      <Text variant="label" fontWeight="medium" color="grey.700" mt="2rem">
        Show QR code to Receive Tokens
      </Text>
      <QRCode value={encodeToBech32(address, 'sent')} />
      <Box mt="2rem">
        <Flex justifyContent="center" alignItems="center" pb="1rem">
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

        <Text as="p" variant="small" color="grey.900" m={0}>
          {encodeToBech32(address, 'sent')}
        </Text>
      </Box>
    </Box>
  );
};
