import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function BoardTile({ tile }) {
  return (
    <View style={styles.tile}>
      <Text>{tile}</Text>
    </View>
  );
}

BoardTile.defaultProps = {
  tile: null
};

BoardTile.propTypes = {
  tile: PropTypes.number
};

export default BoardTile;
