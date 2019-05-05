import boardReducer, { BOARD_SIZE } from '../board';

describe('board reducer', () => {
  it('should return the initial state', () => {
    const board = boardReducer(undefined, {});

    const distinctRowCount = Array.from(new Set(board.map(row => row.length)));
    const distinctFieldValues = Array.from(new Set(board.flat()));

    expect(board.length).toEqual(BOARD_SIZE.rows);
    expect(distinctRowCount).toEqual([BOARD_SIZE.columns]);
    expect(distinctFieldValues).toEqual([0]);
  });
});
