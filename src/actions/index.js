import { ADD_PIECE_TO_BOARD, MOVE_PIECE_DOWN } from './types';

export function addPieceToBoard(piece) {
  return {
    type: ADD_PIECE_TO_BOARD,
    payload: piece
  };
}

export function movePieceDown() {
  return { type: MOVE_PIECE_DOWN };
}
