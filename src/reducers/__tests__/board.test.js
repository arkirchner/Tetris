import randomTetromino from '../../tetrominos';
import boardReducer, { BOARD_SIZE } from '../board';
import { ADD_PIECE_TO_BOARD, MOVE_PIECE_DOWN } from '../../actions/types';

describe('board reducer', () => {
  it('should return the initial state', () => {
    const board = boardReducer(undefined, {});

    const distinctRowCount = Array.from(new Set(board.map(row => row.length)));
    const distinctFieldValues = Array.from(new Set(board.flat()));

    expect(board.length).toEqual(BOARD_SIZE.rows);
    expect(distinctRowCount).toEqual([BOARD_SIZE.columns]);
    expect(distinctFieldValues).toEqual([null]);
  });

  it('can add a piece to the board', () => {
    const piece = randomTetromino();
    const board = boardReducer(undefined, { type: ADD_PIECE_TO_BOARD, payload: piece });

    expect(board.slice(0, piece.length + 1)).toEqual([
      ...piece.map(row => [
        null,
        null,
        null,
        null,
        null,
        ...row,
        ...Array(7 - row.length).fill(null)
      ]),
      [null, null, null, null, null, null, null, null, null, null, null, null]
    ]);
  });

  it('can move a piece on step down', () => {
    const piece = randomTetromino();
    const board = boardReducer(
      boardReducer(undefined, { type: ADD_PIECE_TO_BOARD, payload: piece }),
      { type: MOVE_PIECE_DOWN }
    );

    expect(board.slice(0, piece.length + 2)).toEqual([
      [null, null, null, null, null, null, null, null, null, null, null, null],
      ...piece.map(row => [
        null,
        null,
        null,
        null,
        null,
        ...row,
        ...Array(7 - row.length).fill(null)
      ]),
      [null, null, null, null, null, null, null, null, null, null, null, null]
    ]);
  });
});
