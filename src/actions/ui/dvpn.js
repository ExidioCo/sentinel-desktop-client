import * as actionTypes from '../../constants/ui';

export const setSelectedTab = (tab) => (dispatch, getState) => {
    if (tab === 0) {
        dispatch(setShowMap(0));
    }
    dispatch({
        type: actionTypes.UI_DVPN_SET_SELECTED_TAB,
        data: tab,
    });
};

export const toggleShowSubscribed = () => {
    return {
        type: actionTypes.UI_DVPN_TOGGLE_SHOW_SUBSCRIBED,
    };
};

export const setShowMap = (show) => (dispatch, getState) => {
    const state = getState();
    if (state.ui.dvpn.activeView.selectedTab === 0) {
        show = 0;
    }
    dispatch({
        type: actionTypes.UI_DVPN_SET_SHOW_MAP,
        data: show,
    });
};
