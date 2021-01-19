import { IndividualHostDetail } from "./molecules/IndividualHostDetail";
import { SubscribedIndividualHostDetail } from "./molecules/SubscribedIndividualHostDetail";

export const IndividualHost = ({
  connect,
  setConnect,
  visibleMapView,
  subscribedIndividual,
  setSubscribedIndividual,
}) => {
  return (
    <>
      {subscribedIndividual ? (
        <SubscribedIndividualHostDetail
          connect={connect}
          setConnect={setConnect}
          subscribedIndividual={subscribedIndividual}
          setSubscribedIndividual={setSubscribedIndividual}
        />
      ) : (
        <IndividualHostDetail
          visibleMapView={visibleMapView}
          connect={connect}
          setConnect={setConnect}
          subscribedIndividual={subscribedIndividual}
          setSubscribedIndividual={setSubscribedIndividual}
        />
      )}
    </>
  );
};
