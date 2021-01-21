import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Grid,
  Text,
  Flex,
  Button,
  Modal,
  Error,
  ModalClose,
  Loader,
  HelpTooltip,
} from "atoms";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";

import { FormInput } from "molecules/FormInput/FormInput";
import useVisibleState from "hooks/useVisibleStates";

import {
  GetProposalListAction,
  PostVoteAction,
} from "../../pages/Dashboard/Wallet/actions/WalletActions";

const initialValues = {
  password: "",
};
const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
});

const DetailsCommonComponent = ({ text, textValue }) => {
  return (
    <Grid gridTemplateColumns="15rem 1fr" pb="2rem">
      <Text
        color="text.500"
        fontSize="1.1rem"
        fontWeight="medium"
        textDecoration="none"
        lineHeight="100%"
      >
        {text}
      </Text>
      <Text
        color="primary.700"
        fontSize="1.2rem"
        fontWeight="semiBold"
        textDecoration="none"
        lineHeight="100%"
      >
        {textValue}
      </Text>
    </Grid>
  );
};

const ProposalDetails = ({ proposalObj }) => {
  const dispatch = useDispatch();
  const { visible, hide, toggle } = useVisibleState(false);
  const [voteType, setType] = useState(null);

  const VoteClickHandler = (type) => {
    setType(type);
    toggle();
  };

  const onSubmit = (values, submitProps) => {
    let postData = {
      password: values.password,
      option: voteType,
    };
    dispatch(PostVoteAction(postData, proposalObj.index));
    submitProps.resetForm();
    hide();
  };

  return (
    <Box py="2rem">
      {/* <DetailsCommonComponent
        text="Initial Deposit"
        textValue="512.000000ATOM"
      /> */}
      <DetailsCommonComponent
        text="Total Deposit"
        textValue={(proposalObj.deposit[0].value / 1000000).toFixed(2)}
      />
      <DetailsCommonComponent text="Type" textValue={proposalObj.type} />
      <DetailsCommonComponent
        text="Deposit End Time"
        textValue={moment(proposalObj.deposit_end_time).format(
          "MM-DD-YYYY hh:mm:ss"
        )}
      />
      <DetailsCommonComponent
        text="Submit Time"
        textValue={moment(proposalObj.submit_time).format(
          "MM-DD-YYYY hh:mm:ss"
        )}
      />
      <Box>
        <Text
          color="text.500"
          fontSize="1.1rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
        >
          Description:
        </Text>
        <Text
          color="primary.700"
          fontSize="1.2rem"
          fontWeight="semiBold"
          textDecoration="none"
          lineHeight="1.8rem"
          mt="1rem"
        >
          {proposalObj.description}
        </Text>
      </Box>
      <Grid
        gridAutoFlow="column"
        justifyContent="center"
        gridGap="1rem"
        mt="2rem"
      >
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
          onClick={() => VoteClickHandler("yes")}
        >
          Yes
        </Button>
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
          onClick={() => VoteClickHandler("no")}
        >
          No
        </Button>
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
          onClick={() => VoteClickHandler("abstain")}
        >
          Abstain
        </Button>
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
          onClick={() => VoteClickHandler("no_with_veto")}
        >
          NoWithVeto
        </Button>
        {/* <Button
          variant="normal"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
        >
          Cancel
        </Button> */}
      </Grid>
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {() => {
              return (
                <Box>
                  <Flex alignItems="center">
                    <Text
                      variant="field"
                      fontWeight="medium"
                      color="primary.700"
                      p="1rem"
                    >
                      Voting {voteType}
                    </Text>
                    <HelpTooltip />
                  </Flex>

                  <Form>
                    <Box my="3rem" mx="1rem">
                      <Box>
                        <Text
                          variant="label"
                          fontWeight="medium"
                          color="grey.700"
                          textTransform="uppercase"
                        >
                          Memo
                        </Text>
                        <FormInput
                          as="textarea"
                          rows="3"
                          name="password"
                          label="Enter Memo"
                        />
                        <ErrorMessage name="password" component={Error} />
                      </Box>
                      <Button px="3rem" justifySelf="center" type="submit">
                        CONFIRM VOTE
                      </Button>
                    </Box>
                  </Form>
                </Box>
              );
            }}
          </Formik>
        </Modal>
      )}
    </Box>
  );
};
const ProposalsList = ({ index, proposalObj }) => {
  const { visible, toggle } = useVisibleState(true);
  const [isVisible, setVisible] = useState(false);

  const findMaxValue = (obj, n) => {
    let keys = Object.keys(obj);
    keys.sort(function (a, b) {
      return obj[b] - obj[a];
    });
    keys.slice(0, n);
    return keys[0];
  };

  return (
    <Box p="1.5rem 2rem" border="1px solid" borderColor="border.500" mr="1rem">
      <Flex alignItems="center">
        <Flex
          justifyContent="center"
          alignItems="center"
          bg="bg.600"
          borderRadius="4rem"
          height="4rem"
          width="4rem"
        >
          <Text
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            textDecoration="none"
            lineHeight="100%"
          >
            # {proposalObj.index}
          </Text>
        </Flex>
        <Text
          color="primary.700"
          fontSize="1.4rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
          ml="1rem"
        >
          {proposalObj.title}
        </Text>
      </Flex>
      <Grid
        py="1rem"
        gridTemplateColumns=" 1.5fr 1.5fr 1fr 1fr "
        alignItems="center"
        borderColor="border.500"
      >
        {/* <Flex alignItems="center">
          <Grid gridGap="1rem"> */}
        {/* <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Proposer
            </Text>
            <Text
              color="primary.500"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              iqlusion
            </Text> */}
        {/* </Grid>
        </Flex> */}

        <Flex alignItems="center">
          <Grid gridGap="1rem">
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Voting Start
            </Text>
            <Text
              color="primary.700"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              {moment(proposalObj.voting_start_time).format(
                "MM-DD-YYYY hh:mm:ss"
              )}
            </Text>
          </Grid>
        </Flex>
        <Flex alignItems="center">
          <Grid gridGap="1rem">
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Voting End
            </Text>
            <Text
              color="primary.700"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              {moment(proposalObj.voting_end_time).format(
                "MM-DD-YYYY hh:mm:ss"
              )}
            </Text>
          </Grid>
        </Flex>

        <Flex alignItems="center">
          <Grid gridGap="1rem">
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Most Voted On
            </Text>
            <Text
              color="green.500"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              {findMaxValue(proposalObj.tally_result, 1)}
            </Text>
          </Grid>
        </Flex>

        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
          onClick={toggle}
        >
          {visible ? "View" : "Close"}
        </Button>
      </Grid>

      {!visible && <ProposalDetails proposalObj={proposalObj} />}
    </Box>
  );
};

export const Proposals = () => {
  const dispatch = useDispatch();
  const proposalList = useSelector((state) => state.walletReducer.proposalList);
  const loadingProposal = useSelector((state) => state.walletReducer.loadingProposal);

  useEffect(() => {
    dispatch(GetProposalListAction());
  }, []);

  return (
    <Box mt="3rem" maxHeight="61vh" className="scroll-bar">
      <Loader loading={loadingProposal} relative>
      <Grid gridGap="1rem">
        {proposalList?.data.result.length > 0 &&
          proposalList.data.result.map((obj, index) => {
            return (
              <ProposalsList key={index} index={index} proposalObj={obj} />
            );
          })}
      </Grid>
      </Loader>
    </Box>
  );
};
