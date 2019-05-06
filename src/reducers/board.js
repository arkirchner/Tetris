import { ADD_PIECE_TO_BOARD, MOVE_PIECE_DOWN } from '../actions/types';

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
    case MOVE_PIECE_DOWN:
      return state
        .reverse()
        .map((row, rowIndex, reversedRows) => {
          const nextRow = reversedRows[rowIndex + 1] || [];

          return row
            .map(tile => (tile === 1 ? 0 : tile))
            .map((tile, index) => {
              const nextTile = nextRow[index];

              return nextTile === 1 ? nextTile : tile;
            });
        })
        .reverse();
    default:
      return state;
  }
}
