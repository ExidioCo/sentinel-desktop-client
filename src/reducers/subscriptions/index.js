import { combineReducers } from 'redux';
import addIndividualHost from './addIndividualHost';
import addNodeProvider from './addNodeProvider';
import data from './data';

export default combineReducers({
    addIndividualHost,
    addNodeProvider,
    data,
});
