import compact from 'lodash/compact';
import randomTetromino from '../tetrominos';
import {
  BOARD_SIZE,
  emptyBoard,
  addPiece,
  movePieceDown,
  movePieceLeft,
  movePieceRight,
  stopPieceDropping
} from '../tetris';

describe('tetris', () => {
  it('should return a empty board', () => {
    const board = emptyBoard();

    const distinctRowCount = Array.from(new Set(board.map(row => row.length)));
    const distinctFieldValues = Array.from(new Set(board.flat()));

    expect(board.length).toEqual(BOARD_SIZE.rows);
    expect(distinctRowCount).toEqual([BOARD_SIZE.columns]);
    expect(distinctFieldValues).toEqual([null]);
  });

  describe('addPiece', () => {
    it('can add a piece to the board', () => {
      const piece = randomTetromino();
      const board = addPiece(emptyBoard(), piece);

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

    it('no piece is added when the board has a dropping piece', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // movable tiles
      board[4][3] = { ...tile };
      board[4][4] = { ...tile };

      const unchangedBoard = addPiece(board, randomTetromino());

      expect(board).toEqual(unchangedBoard);
    });
  });

  it('can move a piece one step down', () => {
    const piece = randomTetromino();
    const board = movePieceDown(addPiece(emptyBoard(), piece));

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

  describe('movePieceRight', () => {
    it('moves the tiles to the right', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // movable tiles
      board[0][3] = { ...tile };
      board[0][4] = { ...tile };

      // fixed tiles
      board[BOARD_SIZE.rows - 1][3] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 1][4] = { ...tile, dropped: true };

      const movedBoard = movePieceRight(board);

      // moved the movable tiles
      expect(movedBoard[0][3]).toBeNull();
      expect(movedBoard[0][4]).toEqual(board[0][3]);
      expect(movedBoard[0][5]).toEqual(board[0][4]);

      // did not move fixed tiles
      expect(movedBoard[BOARD_SIZE.rows - 1][2]).toBeNull();
      expect(movedBoard[BOARD_SIZE.rows - 1][3]).toEqual(board[BOARD_SIZE.rows - 1][3]);
      expect(movedBoard[BOARD_SIZE.rows - 1][4]).toEqual(board[BOARD_SIZE.rows - 1][4]);
    });

    it('dose not move the piece if it is blocked', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // movable tiles
      board[3][3] = { ...tile };
      board[3][4] = { ...tile };

      // fixed tiles
      board[3][5] = { ...tile, dropped: true };

      const movedBoard = movePieceRight(board);

      // no pieces have been moved
      expect(movedBoard[3][3]).toEqual(board[3][3]);
      expect(movedBoard[3][4]).toEqual(board[3][4]);
      expect(movedBoard[3][5]).toEqual(board[3][5]);
    });
  });

  describe('movePieceLeft', () => {
    it('moves the tiles to the left', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // movable tiles
      board[0][3] = { ...tile };
      board[0][4] = { ...tile };

      // fixed tiles
      board[BOARD_SIZE.rows - 1][3] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 1][4] = { ...tile, dropped: true };

      const movedBoard = movePieceLeft(board);

      // moved the movable tiles
      expect(movedBoard[0][2]).toEqual(board[0][3]);
      expect(movedBoard[0][3]).toEqual(board[0][4]);
      expect(movedBoard[0][4]).toBeNull();

      // did not move fixed tiles
      expect(movedBoard[BOARD_SIZE.rows - 1][2]).toBeNull();
      expect(movedBoard[BOARD_SIZE.rows - 1][3]).toEqual(board[BOARD_SIZE.rows - 1][3]);
      expect(movedBoard[BOARD_SIZE.rows - 1][4]).toEqual(board[BOARD_SIZE.rows - 1][4]);
    });

    it('dose not move the piece if it is blocked', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // movable tiles
      board[3][3] = { ...tile };
      board[3][4] = { ...tile };

      // fixed tiles
      board[3][2] = { ...tile, dropped: true };

      const movedBoard = movePieceLeft(board);

      // no pieces have been moved
      expect(movedBoard[3][2]).toEqual(board[3][2]);
      expect(movedBoard[3][3]).toEqual(board[3][3]);
      expect(movedBoard[3][4]).toEqual(board[3][4]);
    });
  });

  describe('stopPieceDropping', () => {
    it('stops a tile dropping before it drops out of the board', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // add piece to the bottom of the board
      board[BOARD_SIZE.rows - 1][0] = { ...tile };
      board[BOARD_SIZE.rows - 1][1] = { ...tile };
      board[BOARD_SIZE.rows - 2][0] = { ...tile };
      board[BOARD_SIZE.rows - 3][0] = { ...tile };
      board[BOARD_SIZE.rows - 4][0] = { ...tile };
      board[BOARD_SIZE.rows - 4][1] = { ...tile };

      const stoppedBoard = stopPieceDropping(board);
      const droppedState = Array.from(new Set(compact(stoppedBoard.flat()).map(t => t.dropped)));

      expect(droppedState).toEqual([true]);
    });

    it('stops a piece if it collides with another piece', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // dropped tiles
      board[BOARD_SIZE.rows - 1][4] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 1][5] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 2][3] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 2][4] = { ...tile, dropped: true };

      // dropping piece
      board[BOARD_SIZE.rows - 3][3] = { ...tile };
      board[BOARD_SIZE.rows - 3][4] = { ...tile };
      board[BOARD_SIZE.rows - 3][5] = { ...tile };
      board[BOARD_SIZE.rows - 3][6] = { ...tile };
      board[BOARD_SIZE.rows - 4][3] = { ...tile };

      const stoppedBoard = stopPieceDropping(board);
      const droppedState = Array.from(new Set(compact(stoppedBoard.flat()).map(t => t.dropped)));

      expect(droppedState).toEqual([true]);
    });

    it('dose nothing if the piece dose not collide with bottom or another piece', () => {
      const tile = compact(randomTetromino()[0])[0];
      const board = emptyBoard();

      // dropped tiles
      board[BOARD_SIZE.rows - 1][4] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 1][5] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 2][3] = { ...tile, dropped: true };
      board[BOARD_SIZE.rows - 2][4] = { ...tile, dropped: true };

      // dropping piece
      board[0][3] = { ...tile };
      board[0][4] = { ...tile };
      board[0][5] = { ...tile };
      board[0][6] = { ...tile };

      const stoppedBoard = stopPieceDropping(board);
      const droppedState = Array.from(new Set(compact(stoppedBoard.flat()).map(t => t.dropped)));

      expect(droppedState).toContain(false);
    });
  });
});
