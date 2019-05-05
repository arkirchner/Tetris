export const BOARD_SIZE = { columns: 12, rows: 20 };

const EMPTY_BOARD = Array(BOARD_SIZE.rows)
  .fill(0)
  .map(() => Array(BOARD_SIZE.columns).fill(0));

export default function boardReducer(state = EMPTY_BOARD, action) {
  switch (action.type) {
    default:
      return state;
  }
}
