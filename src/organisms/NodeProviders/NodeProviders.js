import { SubscribedNodeProvider } from "organisms/SubscribedNodeProviders";
import { NodeProviderDetail } from "./molecules/NodeProviderDetail/NodeProviderDetail";

export const NodeProviders = ({
  connect,
  setConnect,
  visibleMapView,
  subscribe,
  setSubscribe,
}) => {
  return (
    <>
      {subscribe ? (
        <SubscribedNodeProvider
          connect={connect}
          setConnect={setConnect}
          setSubscribe={setSubscribe}
        />
      ) : (
        <NodeProviderDetail
          visibleMapView={visibleMapView}
          connect={connect}
          setConnect={setConnect}
          setSubscribe={setSubscribe}
        />
      )}
    </>
  );
};
