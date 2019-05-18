import {
  ADD_PIECE_TO_BOARD,
  MOVE_PIECE_DOWN,
  STOP_PIECE_DROPPING,
  MOVE_PIECE_LEFT,
  MOVE_PIECE_RIGHT
} from '../actions/types';

import {
  emptyBoard,
  movePieceRight,
  movePieceLeft,
  addPiece,
  movePieceDown,
  stopPieceDropping
} from '../tetris';

export default function boardReducer(state = emptyBoard(), action) {
  switch (action.type) {
    case ADD_PIECE_TO_BOARD:
      return addPiece(state, action.payload);
    case MOVE_PIECE_DOWN:
      return movePieceDown(state);
    case STOP_PIECE_DROPPING:
      return stopPieceDropping(state);
    case MOVE_PIECE_LEFT:
      return movePieceLeft(state);
    case MOVE_PIECE_RIGHT:
      return movePieceRight(state);
    default:
      return state;
  }
}
