import React, { useRef } from "react";
import styled from "styled-components";

import { Box } from "../Box";
import { Input } from "../Input";
import { Button } from "atoms/Button";

export const InputFieldBase = styled(Box)`
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
  margin: 5px 0 25px 0;
  gap: 10px;
`;

export const InputField = ({
  label,
  error,
  warning,
  labelHide,
  showLength,
  autofocus,
  maxValue,
  ...props
}) => {
  const ref = useRef(null);

  return (
    <InputFieldBase labelHide={labelHide}>
      <Input placeholder={label} autofocus={autofocus} ref={ref} {...props} />

      {/* {maxValue && (
        <Box position="absolute" pr="0rem" bottom=".3rem" right={0}>
          <Button
            variant="normal"
            textVariant="label"
            textTransform="capitalize"
          >
            Max
          </Button>
        </Box>
      )} */}
    </InputFieldBase>
  );
};
