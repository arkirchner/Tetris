import randomTetromino from '../tetrominos';
import {
  ADD_PIECE_TO_BOARD,
  MOVE_PIECE_DOWN,
  STOP_PIECE_DROPPING,
  MOVE_PIECE_LEFT,
  MOVE_PIECE_RIGHT
} from './types';

export function addPieceToBoard() {
  return {
    type: ADD_PIECE_TO_BOARD,
    payload: randomTetromino()
  };
}

export function movePieceDown() {
  return { type: MOVE_PIECE_DOWN };
}

export function stopPieceDropping() {
  return { type: STOP_PIECE_DROPPING };
}

export function updateBoard() {
  return dispatch => {
    dispatch(stopPieceDropping());

    return dispatch(movePieceDown());
  };
}

export function movePieceLeft() {
  return { type: MOVE_PIECE_LEFT };
}

export function movePieceRight() {
  return { type: MOVE_PIECE_RIGHT };
}
