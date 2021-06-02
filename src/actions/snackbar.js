import { SNACKBAR_HIDE, SNACKBAR_SHOW } from '../constants/snackbar';

export const hideSnackbar = (data) => {
    return {
        type: SNACKBAR_HIDE,
        data,
    };
};

export const showSnackbar = (data) => (dispatch) => {
    // using setTimeout(dispatch, 0) to queue SNACKBAR_SHOW
    // after SNACKBAR_HIDE emitted by the click-away listener
    // of any existing snackbar
    setTimeout(() => {
        dispatch(_showSnackbar(data));
    }, 0);
};

const _showSnackbar = (data) => {
    return {
        type: SNACKBAR_SHOW,
        data,
    };
};
