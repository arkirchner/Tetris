import boardReducer, { BOARD_SIZE } from '../board';
import { ADD_PIECE_TO_BOARD, MOVE_PIECE_DOWN } from '../../actions/types';

describe('board reducer', () => {
  it('should return the initial state', () => {
    const board = boardReducer(undefined, {});

    const distinctRowCount = Array.from(new Set(board.map(row => row.length)));
    const distinctFieldValues = Array.from(new Set(board.flat()));

    expect(board.length).toEqual(BOARD_SIZE.rows);
    expect(distinctRowCount).toEqual([BOARD_SIZE.columns]);
    expect(distinctFieldValues).toEqual([0]);
  });

  it('can add a piece to the board', () => {
    const piece = [[1, 1], [1, 1]];
    const board = boardReducer(undefined, { type: ADD_PIECE_TO_BOARD, payload: piece });

    expect(board.slice(0, 3)).toEqual([
      [0, 0, 0, 0, 0, ...piece[0], 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, ...piece[1], 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
  });

  it('can move a piece on step down', () => {
    const piece = [[1, 1], [1, 1]];
    const board = boardReducer(
      boardReducer(undefined, { type: ADD_PIECE_TO_BOARD, payload: piece }),
      { type: MOVE_PIECE_DOWN }
    );

    expect(board.slice(0, 4)).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, ...piece[0], 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, ...piece[1], 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
  });
});
