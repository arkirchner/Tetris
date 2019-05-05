import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoardTile from './BoardTile';

const styles = StyleSheet.create({
  board: { flex: 1 },
  row: { flex: 1, flexDirection: 'row' }
});

function Board({ board }) {
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

  return <View style={styles.board}>{rows}</View>;
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

const mapStateToProps = ({ board }) => ({ board });

export default connect(mapStateToProps)(Board);
