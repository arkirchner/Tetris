import tetrominos from './tetrominos';

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
  return [...board]
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

function removeFullRows(board) {
  const boardWitoutFullRows = board.filter(row => {
    return !row.every(t => t && t.dropped);
  });

  const emptyLineCount = BOARD_SIZE.rows - boardWitoutFullRows.length;

  const emptyLines = Array(emptyLineCount)
    .fill(null)
    .map(() => Array(BOARD_SIZE.columns).fill(null));

  return [...emptyLines, ...boardWitoutFullRows];
}

export function update(board, tetromino = tetrominos()) {
  if (boardNeedsPiece(board)) {
    return addPiece(board, tetromino);
  }

  return removeFullRows(movePieceDown(stopPieceDropping(board)));
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

export function rotatePiece(board) {
  const movingTiles = board
    .map((row, rowIndex) =>
      row.map((tile, columnIndex) =>
        tile && !tile.dropped ? { tile, rowIndex, columnIndex } : null
      )
    )
    .flat()
    .filter(Boolean);

  const centerTile = movingTiles.find(movingTile => movingTile.tile.center);

  if (!centerTile) {
    return board;
  }

  const { rowIndex: centerRow, columnIndex: centerColumn } = centerTile;

  const movedTiles = movingTiles.map(movingTile => {
    if (movingTile.tile.center) {
      return movingTile;
    }

    const { rowIndex: row, columnIndex: column } = movingTile;

    return {
      ...movingTile,
      rowIndex: column + centerRow - centerColumn,
      columnIndex: row + centerColumn - centerRow
    };
  });

  const clearedBord = board.map(row => row.map(tile => (tile && !tile.dropped ? null : tile)));

  const canRotate = movedTiles.every(movedTile => {
    const { rowIndex: row, columnIndex: column, tile } = movedTile;

    if (
      (clearedBord[row] && clearedBord[row][column]) ||
      row < 0 ||
      row >= BOARD_SIZE.rows ||
      column < 0 ||
      column >= BOARD_SIZE.columns
    ) {
      return false;
    }

    clearedBord[row][column] = tile;
    return true;
  });

  return canRotate ? clearedBord : board;
}
