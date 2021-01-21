import { Image, Flex } from "atoms";
import React from "react";
import LoaderGif from "../../assets/images/loader.gif";

export const SentinelLoader = () => {
  return (
    <Flex justifyContent="center" pt="3rem">
      <Image
        src={LoaderGif}
        alt="loader"
        objectFit="scale-down"
        height="5.5rem"
        width="5rem"
      />
    </Flex>
  );
};
