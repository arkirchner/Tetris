import { MOVE_PIECE_LEFT, MOVE_PIECE_RIGHT, UPDATE_BOARD, ROTATE_PIECE } from '../actions/types';

import { emptyBoard, movePieceRight, movePieceLeft, update, rotatePiece } from '../tetris';

export default function boardReducer(state = emptyBoard(), action) {
  switch (action.type) {
    case MOVE_PIECE_LEFT:
      return movePieceLeft(state);
    case MOVE_PIECE_RIGHT:
      return movePieceRight(state);
    case UPDATE_BOARD:
      return update(state);
    case ROTATE_PIECE:
      return rotatePiece(state);
    default:
      return state;
  }
}
