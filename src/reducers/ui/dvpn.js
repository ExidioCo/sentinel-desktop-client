import * as actionTypes from '../../constants/ui';
import { combineReducers } from 'redux';

const activeView = (state = {
    selectedTab: 0,
    showSubscribed: 0,
    showMap: 0,
}, action) => {
    switch (action.type) {
    case actionTypes.UI_DVPN_SET_SELECTED_TAB:
        return {
            ...state,
            selectedTab: action.data,
        };
    case actionTypes.UI_DVPN_TOGGLE_SHOW_SUBSCRIBED:
        return {
            ...state,
            showSubscribed: Number(!state.showSubscribed),
        };
    case actionTypes.UI_DVPN_SET_SHOW_MAP:
        return {
            ...state,
            showMap: action.data,
        };
    default:
        return state;
    }
};

export default combineReducers({
    activeView,
});
