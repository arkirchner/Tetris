import randomTetromino from '../tetrominos';
import { ADD_PIECE_TO_BOARD, MOVE_PIECE_DOWN } from './types';

export function addPieceToBoard() {
  return {
    type: ADD_PIECE_TO_BOARD,
    payload: randomTetromino()
  };
}

export function movePieceDown() {
  return { type: MOVE_PIECE_DOWN };
}
