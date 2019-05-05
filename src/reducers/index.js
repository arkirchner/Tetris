import { combineReducers } from 'redux';
import boardReducer from './board';

const Reducers = combineReducers({ board: boardReducer });

export default Reducers;
