export const BOARD_SIZE = { columns: 12, rows: 20 };

export function emptyBoard() {
  return Array(BOARD_SIZE.rows)
    .fill(null)
    .map(() => Array(BOARD_SIZE.columns).fill(null));
}

function boardNeedsPiece(board) {
  return !board.flat().some(tile => tile && tile.dropped === false);
}

function movePieceDown(board) {
  return board
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

function stopPieceDropping(board) {
  if (boardDropped(board)) {
    return board.map(row => {
      return row.map(tile => (tile ? { ...tile, dropped: true } : tile));
    });
  }

  return board;
}

export function addPiece(board, piece) {
  if (boardNeedsPiece(board)) {
    return board.map((row, rowIndex) => {
      const insertAt = BOARD_SIZE.columns / 2 - 1;
      const pieceRow = piece[rowIndex];

      if (pieceRow) {
        return row.map((tile, index) => {
          const tilePiece = pieceRow[index - insertAt];
          return tilePiece || tile;
        });
      }

      return row;
    });
  }

  return board;
}

export function update(board) {
  return movePieceDown(stopPieceDropping(board));
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

export function movePieceLeft(board) {
  if (canMoveToLeft(board)) {
    return board.map(row => {
      const moveableTiles = row.map(tile => {
        return tile && tile.dropped === false ? tile : null;
      });

      return row
        .map(tile => (tile && tile.dropped === false ? null : tile))
        .map((tile, index) => moveableTiles[index + 1] || tile);
    });
  }

  return board;
}

export function movePieceRight(board) {
  if (canMoveToRight(board)) {
    return board.map(row => {
      const moveableTiles = row.map(tile => {
        return tile && tile.dropped === false ? tile : null;
      });

      return row
        .map(tile => (tile && tile.dropped === false ? null : tile))
        .map((tile, index) => moveableTiles[index - 1] || tile);
    });
  }

  return board;
}
