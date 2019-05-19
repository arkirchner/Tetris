import {
  ADD_PIECE_TO_BOARD,
  MOVE_PIECE_LEFT,
  MOVE_PIECE_RIGHT,
  UPDATE_BOARD
} from '../actions/types';

import { emptyBoard, movePieceRight, movePieceLeft, addPiece, update } from '../tetris';

export default function boardReducer(state = emptyBoard(), action) {
  switch (action.type) {
    case ADD_PIECE_TO_BOARD:
      return addPiece(state, action.payload);
    case MOVE_PIECE_LEFT:
      return movePieceLeft(state);
    case MOVE_PIECE_RIGHT:
      return movePieceRight(state);
    case UPDATE_BOARD:
      return update(state);
    default:
      return state;
  }
}
