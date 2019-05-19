import randomTetromino from '../tetrominos';
import { ADD_PIECE_TO_BOARD, MOVE_PIECE_LEFT, MOVE_PIECE_RIGHT, UPDATE_BOARD } from './types';

export function addPieceToBoard() {
  return {
    type: ADD_PIECE_TO_BOARD,
    payload: randomTetromino()
  };
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
