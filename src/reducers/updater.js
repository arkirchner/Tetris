import { START_GAME, STOP_GAME } from '../actions/types';

export const INTERVAL = 500;

export default function updaterReducer(state = null, action) {
  switch (action.type) {
    case START_GAME:
      return action.payload;
    case STOP_GAME:
      if (state) {
        clearInterval(state);
      }

      return null;
    default:
      return state;
  }
}
