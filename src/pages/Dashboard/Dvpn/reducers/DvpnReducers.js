import { DvpnActionTypes } from '../constants/index';

const initialState = {
    loading: false,
    sessionOfAnAddressDetails: null,
    providersData: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        // DVPN Session Of An Address Reducer
        case DvpnActionTypes.get_SessionOfAnAddress.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DvpnActionTypes.get_SessionOfAnAddress.SUCCESS:
            return {
                ...state,
                loading: false,
                sessionOfAnAddressDetails: payload,
            };
        case DvpnActionTypes.get_SessionOfAnAddress.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // DVPN providers Reducer
        case DvpnActionTypes.get_Providers.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DvpnActionTypes.get_Providers.SUCCESS:
            return {
                ...state,
                loading: false,
                providersData: payload,
            };
        case DvpnActionTypes.get_Providers.FAILURE:
            return {
                ...state,
                loading: false,
            };
        
        default:
            return state;
    }
};
