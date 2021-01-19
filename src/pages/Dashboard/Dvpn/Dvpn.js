import { useState } from "react";

import { Box } from "atoms";
import { DvpnDetails } from "templates/DvpnDetails";
import { QuickConnect } from "./molecules/QuickConnect";

export const Dvpn = ({ connect, setConnect }) => {
  const [subscribe, setSubscribe] = useState(false);
  const [subscribedIndividual, setSubscribedIndividual] = useState(false);

  return (
    <Box bg="bg.500">
      <QuickConnect connect={connect} setConnect={setConnect} />
      <DvpnDetails
        connect={connect}
        setConnect={setConnect}
        subscribe={subscribe}
        setSubscribe={setSubscribe}
        subscribedIndividual={subscribedIndividual}
        setSubscribedIndividual={setSubscribedIndividual}
      />
    </Box>
  );
};
