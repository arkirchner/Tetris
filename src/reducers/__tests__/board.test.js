import boardReducer from '../board';
import * as tetris from '../../tetris';
import { updateBoard, movePieceRight, movePieceLeft, rotatePiece } from '../../actions';

describe('boardReducer', () => {
  it('receives the empty board', () => {
    const spy = jest.spyOn(tetris, 'emptyBoard');
    const board = boardReducer(undefined, {});
    const distinctFieldValues = Array.from(new Set(board.flat()));

    expect(spy).toHaveBeenCalled();
    expect(distinctFieldValues).toEqual([null]);

    spy.mockRestore();
  });

  it('UPDATE_BOARD', () => {
    const syp = jest.spyOn(tetris, 'update');
    boardReducer(undefined, updateBoard());
    expect(syp).toHaveBeenCalled();

    syp.mockRestore();
  });

  it('MOVE_PIECE_LEFT', () => {
    const syp = jest.spyOn(tetris, 'movePieceLeft');
    boardReducer(undefined, movePieceLeft());
    expect(syp).toHaveBeenCalled();

    syp.mockRestore();
  });

  it('MOVE_PIECE_RIGHT', () => {
    const syp = jest.spyOn(tetris, 'movePieceRight');
    boardReducer(undefined, movePieceRight());
    expect(syp).toHaveBeenCalled();

    syp.mockRestore();
  });

  it('ROTATE_PIECE', () => {
    const syp = jest.spyOn(tetris, 'rotatePiece');
    boardReducer(undefined, rotatePiece());
    expect(syp).toHaveBeenCalled();

    syp.mockRestore();
  });
});
