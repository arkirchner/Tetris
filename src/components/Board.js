import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoardTile from './BoardTile';

function Board({ board }) {
  // Array length is constant. Index can be used as key!
  /* eslint-disable react/no-array-index-key */
  const tiles = board.flat().map((tile, index) => <BoardTile key={index} tile={tile} />);

  return <View>{tiles}</View>;
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

const mapStateToProps = state => {
  const { board } = state;
  return { board };
};

export default connect(mapStateToProps)(Board);
