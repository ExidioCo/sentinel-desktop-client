import React from "react";
import styled from "styled-components";

import { Box } from "../Box";

const LoaderStyle = styled(Box)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = ({ loading, children, relative }) => {
  if (loading) {
    return (
      <LoaderStyle
        border={1}
        borderColor="black.0"
        borderTop="2px solid"
        borderTopColor="black.0"
        borderRadius="50%"
        width="2rem"
        height="2rem"
        maxWidth="100%"
        maxHeight="100%"
        overflow="auto"
        position={relative ? "relative" : "absolute"}
        left={0}
        right={0}
        top={0}
        bottom={0}
        margin="auto"
      />
    );
  }
  return <>{children || null} </>;
};

Loader.defaultProps = {
  loading: true,
};
