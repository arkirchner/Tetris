import {
  ADD_PIECE_TO_BOARD,
  MOVE_PIECE_DOWN,
  STOP_PIECE_DROPPING,
  MOVE_PIECE_LEFT,
  MOVE_PIECE_RIGHT
} from '../actions/types';

export const BOARD_SIZE = { columns: 12, rows: 20 };

function emptyBoard() {
  return Array(BOARD_SIZE.rows)
    .fill(null)
    .map(() => Array(BOARD_SIZE.columns).fill(null));
}

function tileDropped(tile, nextRow, index) {
  if (tile && tile.dropped === false) {
    // has the tile reached the end of the board?
    if (!nextRow) {
      return true;
    }

    const nextTile = nextRow[index];

    return nextTile ? nextTile.dropped : false;
  }

  return false;
}

function boardDropped(board) {
  return board.reduce((dropped, row, rowIndex) => {
    const nextRow = board[rowIndex + 1];

    return (
      dropped ||
      row.reduce((droppedTile, tile, index) => {
        return droppedTile || tileDropped(tile, nextRow, index);
      }, false)
    );
  }, false);
}

function canMoveToRight(board) {
  return !board
    .map(row => {
      return row.map((tile, index) => {
        const rightTile = row[index + 1];

        if (
          tile &&
          tile.dropped === false &&
          (rightTile === undefined || (rightTile && rightTile.dropped))
        ) {
          return false;
        }

        return true;
      });
    })
    .flat()
    .includes(false);
}

function canMoveToLeft(board) {
  return !board
    .map(row => {
      return row.map((tile, index) => {
        const leftTile = row[index - 1];

        if (
          tile &&
          tile.dropped === false &&
          (leftTile === undefined || (leftTile && leftTile.dropped))
        ) {
          return false;
        }

        return true;
      });
    })
    .flat()
    .includes(false);
}

export default function boardReducer(state = emptyBoard(), action) {
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
            .map(tile => (tile && tile.dropped === false ? null : tile))
            .map((tile, index) => {
              const nextTile = nextRow[index];

              return nextTile && nextTile.dropped === false ? nextTile : tile;
            });
        })
        .reverse();
    case STOP_PIECE_DROPPING:
      if (boardDropped(state)) {
        return state.map(row => {
          return row.map(tile => (tile ? { ...tile, dropped: true } : tile));
        });
      }

      return state;
    case MOVE_PIECE_LEFT:
      if (canMoveToLeft(state)) {
        return state.map(row => {
          const moveableTiles = row.map(tile => {
            return tile && tile.dropped === false ? tile : null;
          });

          return row
            .map(tile => (tile && tile.dropped === false ? null : tile))
            .map((tile, index) => moveableTiles[index + 1] || tile);
        });
      }

      return state;
    case MOVE_PIECE_RIGHT:
      if (canMoveToRight(state)) {
        return state.map(row => {
          const moveableTiles = row.map(tile => {
            return tile && tile.dropped === false ? tile : null;
          });

          return row
            .map(tile => (tile && tile.dropped === false ? null : tile))
            .map((tile, index) => moveableTiles[index - 1] || tile);
        });
      }

      return state;
    default:
      return state;
  }
}
