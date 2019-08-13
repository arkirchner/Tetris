import { MOVE_PIECE_LEFT, MOVE_PIECE_RIGHT, UPDATE_BOARD, ROTATE_PIECE } from './types';

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
