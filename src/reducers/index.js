import { combineReducers } from 'redux';

import loginReducer from '../pages/Login/reducers/LoginReducers';
import walletReducer from '../pages/Dashboard/Wallet/reducers/WalletReducers';
import dvpnReducer from '../pages/Dashboard/Dvpn/reducers/DvpnReducers';

export default combineReducers({
    // all the reducer will be imported here
    loginReducer: loginReducer,
    walletReducer: walletReducer,
    dvpnReducer: dvpnReducer
})