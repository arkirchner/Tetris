import boardReducer from '../board';
import * as tetris from '../../tetris';
import {
  addPieceToBoard,
  movePieceDown,
  stopPieceDropping,
  movePieceRight,
  movePieceLeft
} from '../../actions';

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

  it('ADD_PIECE_TO_BOARD', () => {
    const syp = jest.spyOn(tetris, 'addPiece');
    const board = boardReducer(undefined, addPieceToBoard());
    expect(syp).toHaveBeenCalled();
    hasValidBoardSize(board);

    syp.mockRestore();
  });

  it('MOVE_PIECE_DOWN', () => {
    const syp = jest.spyOn(tetris, 'movePieceDown');
    const board = boardReducer(undefined, movePieceDown());
    expect(syp).toHaveBeenCalled();
    hasValidBoardSize(board);

    syp.mockRestore();
  });

  it('STOP_PIECE_DROPPING', () => {
    const syp = jest.spyOn(tetris, 'stopPieceDropping');
    const board = boardReducer(undefined, stopPieceDropping());
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
