import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  tile: {
    flex: 1
  }
});

function BoardTile({ color }) {
  return <View style={{ ...styles.tile, backgroundColor: color }} />;
}

BoardTile.propTypes = {
  color: PropTypes.string.isRequired
};

const mapStateToProps = ({ board }, { row, column }) => {
  const tile = board[row][column];

  return {
    color: tile ? tile.color : 'white'
  };
};

export default connect(mapStateToProps)(BoardTile);
