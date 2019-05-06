import { ADD_PIECE_TO_BOARD } from './types';

export function addPieceToBoard(piece) {
  return {
    type: ADD_PIECE_TO_BOARD,
    payload: piece
  };
}
