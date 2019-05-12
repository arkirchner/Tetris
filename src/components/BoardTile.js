import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

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

export default BoardTile;
