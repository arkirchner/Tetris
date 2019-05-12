import boardReducer, { BOARD_SIZE } from '../board';
import { addPieceToBoard, movePieceDown } from '../../actions';

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
    const action = addPieceToBoard();
    const piece = action.payload;
    const board = boardReducer(undefined, action);

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
    const action = addPieceToBoard();
    const piece = action.payload;
    const board = boardReducer(boardReducer(undefined, action), movePieceDown());

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
