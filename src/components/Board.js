import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoardTile from './BoardTile';
import { addPieceToBoard } from '../actions';

const styles = StyleSheet.create({
  board: { flex: 1 },
  row: { flex: 1, flexDirection: 'row' }
});

function Board({ board, addPieceToBoard: addPiece }) {
  const rows = board.map((row, rowIndex) => {
    // Array length is constant. Index can be used as key!
    /* eslint-disable react/no-array-index-key */
    return (
      <View style={styles.row} key={rowIndex}>
        {row.map((tile, index) => (
          <BoardTile tile={tile} key={rowIndex + index} />
        ))}
      </View>
    );
  });

  return (
    <TouchableOpacity onPress={() => addPiece([[1, 1], [1, 1]])} style={styles.board}>
      {rows}
    </TouchableOpacity>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  addPieceToBoard: PropTypes.func.isRequired
};

const mapStateToProps = ({ board }) => ({ board });

export default connect(
  mapStateToProps,
  { addPieceToBoard }
)(Board);
