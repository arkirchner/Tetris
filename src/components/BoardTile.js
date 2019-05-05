import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

function BoardTile({ tile }) {
  return (
    <View>
      <Text>{tile}</Text>
    </View>
  );
}

BoardTile.propTypes = {
  tile: PropTypes.number.isRequired
};

export default BoardTile;
