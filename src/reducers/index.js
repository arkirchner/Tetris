import { combineReducers } from 'redux';
import boardReducer from './board';
import updaterReducer from './updater';

const Reducers = combineReducers({ board: boardReducer, updater: updaterReducer });

export default Reducers;
