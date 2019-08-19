import {
  MOVE_PIECE_LEFT,
  MOVE_PIECE_RIGHT,
  UPDATE_BOARD,
  ROTATE_PIECE,
  START_GAME,
  STOP_GAME
} from './types';

export const INTERVAL = 500;

export function stopGame() {
  return { type: STOP_GAME };
}

export function updateBoard() {
  return { type: UPDATE_BOARD };
}

export function movePieceLeft() {
  return { type: MOVE_PIECE_LEFT };
}

export function movePieceRight() {
  return { type: MOVE_PIECE_RIGHT };
}

export function rotatePiece() {
  return { type: ROTATE_PIECE };
}

export function startGame() {
  return dispatch => {
    const updater = setInterval(() => {
      dispatch(updateBoard());
    }, INTERVAL);

    dispatch({ type: START_GAME, payload: updater });
  };
}
