import boardReducer from '../board';
import * as tetris from '../../tetris';
import { updateBoard, movePieceRight, movePieceLeft } from '../../actions';

function hasValidBoardSize(board) {
  const distinctRowCount = Array.from(new Set(board.map(row => row.length)));

  expect(board.length).toEqual(tetris.BOARD_SIZE.rows);
  expect(distinctRowCount).toEqual([tetris.BOARD_SIZE.columns]);
}

describe('boardReducer', () => {
  it('receives the empty board', () => {
    const spy = jest.spyOn(tetris, 'emptyBoard');
    const board = boardReducer(undefined, {});
    const distinctFieldValues = Array.from(new Set(board.flat()));

    expect(spy).toHaveBeenCalled();
    hasValidBoardSize(board);
    expect(distinctFieldValues).toEqual([null]);

    spy.mockRestore();
  });

  it('UPDATE_BOARD', () => {
    const syp = jest.spyOn(tetris, 'update');
    const board = boardReducer(undefined, updateBoard());
    expect(syp).toHaveBeenCalled();
    hasValidBoardSize(board);

    syp.mockRestore();
  });

  it('MOVE_PIECE_LEFT', () => {
    const syp = jest.spyOn(tetris, 'movePieceLeft');
    const board = boardReducer(undefined, movePieceLeft());
    expect(syp).toHaveBeenCalled();
    hasValidBoardSize(board);

    syp.mockRestore();
  });

  it('MOVE_PIECE_RIGHT', () => {
    const syp = jest.spyOn(tetris, 'movePieceRight');
    const board = boardReducer(undefined, movePieceRight());
    expect(syp).toHaveBeenCalled();
    hasValidBoardSize(board);

    syp.mockRestore();
  });
});
