import { ADD_PIECE_TO_BOARD } from '../actions/types';

export const BOARD_SIZE = { columns: 12, rows: 20 };

const EMPTY_BOARD = Array(BOARD_SIZE.rows)
  .fill(0)
  .map(() => Array(BOARD_SIZE.columns).fill(0));

export default function boardReducer(state = EMPTY_BOARD, action) {
  switch (action.type) {
    case ADD_PIECE_TO_BOARD:
      return state.map((row, rowIndex) => {
        const insertAt = BOARD_SIZE.columns / 2 - 1;
        const pieceRow = action.payload[rowIndex];

        if (pieceRow) {
          return row.map((tile, index) => {
            const tilePiece = pieceRow[index - insertAt];
            return tilePiece || tile;
          });
        }

        return row;
      });
    default:
      return state;
  }
}
