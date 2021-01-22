import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Grid, Text, Flex, Button } from "atoms";
import SearchField from "react-search-field";

import { Proposals } from "organisms/Proposals/";
import { Validators } from "organisms/Validators";
import MemoArrowBottom from "assets/icons/ArrowBottom";
import { DropdownFilter } from "molecules/DropdownFilter";

import { GetCurrencyConversionDetailsAction } from "../../pages/Dashboard/Wallet/actions/WalletActions";

export const ShowPopup = ({
  hideDelegate,
  dropdownValue,
  setDropdownValue,
  dropdown,
  setDropdown,
}) => {
  useEffect(() => {
    if (hideDelegate === true) {
      setDropdownValue("RE-DELEGATE");
    } else {
      setDropdownValue("DELEGATE");
    }
  }, []);

  return (
    <DropdownFilter
      render={
        <Grid width="15rem" py="2rem">
          {!hideDelegate && (
            <Flex px="2rem" cursor="pointer" alignItems="center">
              <Text
                width="100%"
                fontSize="1.4rem"
                fontWeight="medium"
                pb="1rem"
                mb={0}
                color="gray.900"
                onClick={() => {
                  setDropdownValue("DELEGATE");
                  setDropdown(false);
                }}
              >
                DELEGATE
              </Text>
            </Flex>
          )}

          <Flex px="2rem" cursor="pointer" alignItems="center">
            <Text
              width="100%"
              fontSize="1.4rem"
              fontWeight="medium"
              pb="1rem"
              mb={0}
              pt="1rem"
              color="gray.900"
              onClick={() => {
                setDropdownValue("RE-DELEGATE");
                setDropdown(false);
              }}
            >
              RE-DELEGATE
            </Text>
          </Flex>

          <Flex px="2rem" cursor="pointer" alignItems="center">
            <Text
              width="100%"
              fontWeight="medium"
              fontSize="1.4rem"
              color="gray.900"
              pt="1rem"
              onClick={() => {
                setDropdownValue("UNBOND");
                setDropdown(false);
              }}
            >
              UNBOND
            </Text>
          </Flex>
        </Grid>
      }
      onClose={() => setDropdown(false)}
      open={dropdown}
      onOpen={() => setDropdown(true)}
    >
      <Flex
        alignItems="center"
        border="1px solid "
        borderColor="border.500"
        p="1rem"
        borderRadius="3rem"
      >
        <Text
          color="primary.700"
          fontSize="1.2rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
          mr="1rem"
        >
          {dropdownValue}
        </Text>
        <MemoArrowBottom height=".8rem" width="1rem" />
      </Flex>
    </DropdownFilter>
  );
};

export const WalletDetails = () => {
  const [visibleValidatorList, setVisibleValidatorList] = useState(true);
  const [visibleProposal, setVisibleProposal] = useState(false);
  const [visibleActive, setVisibleActive] = useState(true);
  const [visibleInActive, setVisibleInActive] = useState(false);
  const [hideDelegate, setHideDelegate] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const accountDetails = useSelector(
    (state) => state.walletReducer.accountDetails
  );
  const coingekoDetails = useSelector(
    (state) => state.walletReducer.coingekoDetails
  );
  let USDprice = coingekoDetails?.data.market_data.current_price.usd;
  let tokens = accountDetails?.data.result.coins[0].value;
  let USDvalue = (tokens / 1000000) * USDprice;

  useEffect(() => {
    dispatch(GetCurrencyConversionDetailsAction());
  }, []);

  const ValidatorListHandler = () => {
    setVisibleValidatorList(true);
    setVisibleProposal(false);
  };

  const ProposalHandler = () => {
    setVisibleValidatorList(false);
    setVisibleProposal(true);
  };

  const onChangeHandler = (e) => {
    let value = e.target.value;
  };

  const activeValidatorsHandler = () => {
    setVisibleActive(true);
    setVisibleInActive(false);
    setHideDelegate(false);
  };

  const inActiveValidatorsHandler = () => {
    setVisibleInActive(true);
    setVisibleActive(false);
    setHideDelegate(true);
  };

  return (
    <Box pt="5rem" px="3rem">
      <Text
        variant="field"
        fontWeight="medium"
        color="grey.300"
        textTransform="uppercase"
      >
        SENT
      </Text>
      <Text
        variant="heading5"
        fontWeight="medium"
        color="primary.700"
        pt="2rem"
      >
        {tokens !== undefined ? (tokens / 1000000).toFixed(2) : 0}
        <Text as="span" variant="title" color="text.500" pl="1rem">
          (= ${!isNaN(USDvalue) ? USDvalue.toFixed(2) : 0} USD)
        </Text>
      </Text>
      <Box mt="3rem" mr="1rem">
        <Grid
          gridAutoFlow="column"
          justifyContent="space-between"
          gridGap="2rem"
          alignItems="center"
        >
          <Flex>
            <Button
              variant={visibleValidatorList ? "greyBorder" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ValidatorListHandler}
            >
              Validators List
            </Button>
            <Button
              variant={visibleProposal ? "greyBorder" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ProposalHandler}
            >
              Proposals
            </Button>
          </Flex>
          <Grid
            gridGap="1rem"
            gridAutoFlow="column"
            justifyContent="end"
            alignItems="center"
          >
            <Box />
            {visibleValidatorList && (
              <Flex justifyContent="end">
                <Flex>
                  <Button
                    variant={visibleActive ? "active" : "inActive"}
                    textVariant="label"
                    px="1rem"
                    justifySelf="center"
                    type="submit"
                    textTransform="capitalize"
                    onClick={activeValidatorsHandler}
                  >
                    Active
                  </Button>
                  <Button
                    variant={visibleActive ? "inActive" : "active"}
                    textVariant="label"
                    px="1rem"
                    justifySelf="center"
                    type="submit"
                    textTransform="capitalize"
                    onClick={inActiveValidatorsHandler}
                  >
                    InActive
                  </Button>
                </Flex>
                <Box width="15rem">
                  <ShowPopup
                    hideDelegate={hideDelegate}
                    dropdownValue={dropdownValue}
                    setDropdown={setDropdown}
                    dropdown={dropdown}
                    setDropdownValue={setDropdownValue}
                  />
                </Box>
              </Flex>
            )}
            {/* <SearchField
              placeholder="Search"
              onChange={onChangeHandler}
              classNames="search-container"
            /> */}
          </Grid>
        </Grid>
      </Box>
      {visibleValidatorList ? (
        <Validators
          visibleInActive={visibleInActive}
          dropdownValue={dropdownValue}
          hideDelegate={hideDelegate}
          setDropdownValue={setDropdownValue}
        />
      ) : (
        <Proposals />
      )}
    </Box>
  );
};
