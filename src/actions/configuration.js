import {
    CONFIGURATION_CHAIN_BROADCAST_MODE_SET,
    CONFIGURATION_CHAIN_FEES_SET,
    CONFIGURATION_CHAIN_GAS_ADJUSTMENT_SET,
    CONFIGURATION_CHAIN_GAS_PRICES_SET,
    CONFIGURATION_CHAIN_GAS_SET,
    CONFIGURATION_CHAIN_ID_SET,
    CONFIGURATION_CHAIN_RPC_ADDRESS_SET,
    CONFIGURATION_CHAIN_SIMULATE_AND_EXECUTE_SET,
    CONFIGURATION_CHAIN_TRUST_NODE_SET,
    CONFIGURATION_GET_ERROR,
    CONFIGURATION_GET_IN_PROGRESS,
    CONFIGURATION_GET_SUCCESS,
    CONFIGURATION_GET_URL,
    CONFIGURATION_MODAL_HIDE,
    CONFIGURATION_MODAL_SHOW,
    CONFIGURATION_PUT_ERROR,
    CONFIGURATION_PUT_IN_PROGRESS,
    CONFIGURATION_PUT_SUCCESS,
    CONFIGURATION_PUT_URL,
    CONFIGURATION_SETUP_SET,
} from '../constants/configuration';
import { emptyFunc } from '../constants/common';
import Async from 'async';
import Axios from '../services/axios';

export const setConfigurationSetup = (data) => {
    return {
        type: CONFIGURATION_SETUP_SET,
        data,
    };
};

export const setConfigurationChainBroadcastMode = (data) => {
    return {
        type: CONFIGURATION_CHAIN_BROADCAST_MODE_SET,
        data,
    };
};

export const setConfigurationChainFees = (data) => {
    return {
        type: CONFIGURATION_CHAIN_FEES_SET,
        data,
    };
};

export const setConfigurationChainGasAdjustment = (data) => {
    return {
        type: CONFIGURATION_CHAIN_GAS_ADJUSTMENT_SET,
        data,
    };
};

export const setConfigurationChainGasPrices = (data) => {
    return {
        type: CONFIGURATION_CHAIN_GAS_PRICES_SET,
        data,
    };
};

export const setConfigurationChainGas = (data) => {
    return {
        type: CONFIGURATION_CHAIN_GAS_SET,
        data,
    };
};

export const setConfigurationChainID = (data) => {
    return {
        type: CONFIGURATION_CHAIN_ID_SET,
        data,
    };
};

export const setConfigurationChainRPCAddress = (data) => {
    return {
        type: CONFIGURATION_CHAIN_RPC_ADDRESS_SET,
        data,
    };
};

export const setConfigurationChainSimulateAndExecute = (data) => {
    return {
        type: CONFIGURATION_CHAIN_SIMULATE_AND_EXECUTE_SET,
        data,
    };
};

export const setConfigurationChainTrustNode = (data) => {
    return {
        type: CONFIGURATION_CHAIN_TRUST_NODE_SET,
        data,
    };
};

export const getConfigurationInProgress = (data) => {
    return {
        type: CONFIGURATION_GET_IN_PROGRESS,
        data,
    };
};

export const getConfigurationError = (data) => {
    return {
        type: CONFIGURATION_GET_ERROR,
        data,
    };
};

export const getConfigurationSuccess = (data) => {
    return {
        type: CONFIGURATION_GET_SUCCESS,
        data,
    };
};

export const getConfiguration = (history, cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getConfigurationInProgress());
            next(null);
        }, (next) => {
            Axios.get(CONFIGURATION_GET_URL)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(getConfigurationError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getConfigurationSuccess(result));
            next(null);
        }, (next) => {
            const { configuration } = getState();

            if (configuration.setup.value) {
                history.push('/configuration');
                next(new Error(''));
            } else {
                next(null);
            }
        },
    ], cb);
};

export const putConfigurationInProgress = (data) => {
    return {
        type: CONFIGURATION_PUT_IN_PROGRESS,
        data,
    };
};

export const putConfigurationError = (data) => {
    return {
        type: CONFIGURATION_PUT_ERROR,
        data,
    };
};

export const putConfigurationSuccess = (data) => {
    return {
        type: CONFIGURATION_PUT_SUCCESS,
        data,
    };
};

export const putConfiguration = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(putConfigurationInProgress());
            next(null);
        }, (next) => {
            const {
                keys,
                configuration,
            } = getState();

            Axios.put(CONFIGURATION_PUT_URL, {
                from: keys.items[keys.index]?.name,
                chain: {
                    broadcast_mode: configuration.chain.broadcastMode.value.trim(),
                    fees: configuration.chain.fees.value.trim(),
                    gas_adjustment: configuration.chain.gasAdjustment.value,
                    gas_prices: configuration.chain.gasPrices.value.trim(),
                    gas: configuration.chain.gas.value,
                    id: configuration.chain.id.value.trim(),
                    rpc_address: configuration.chain.RPCAddress.value.trim(),
                    simulate_and_execute: configuration.chain.simulateAndExecute.value,
                    trust_node: configuration.chain.trustNode.value,
                },
                setup: false,
            })
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(putConfigurationError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(putConfigurationSuccess(result));
            next(null);
        },
    ], cb);
};

export const showConfigurationModal = (data) => {
    return {
        type: CONFIGURATION_MODAL_SHOW,
        data,
    };
};

export const hideConfigurationModal = (data) => {
    return {
        type: CONFIGURATION_MODAL_HIDE,
        data,
    };
};
