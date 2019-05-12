import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoardTile from './BoardTile';
import { addPieceToBoard, movePieceDown } from '../actions';

const styles = StyleSheet.create({
  board: { flex: 1 },
  row: { flex: 1, flexDirection: 'row' }
});

export const INTERVAL = 500;

class Board extends Component {
  componentDidMount() {
    const { movePieceDown: down } = this.props;

    this.dropInterval = setInterval(down, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.dorpInterval);
  }

  renderRows() {
    const { board } = this.props;

    return board.map((row, rowIndex) => {
      // Array length is constant. Index can be used as key!
      /* eslint-disable react/no-array-index-key */
      return (
        <View style={styles.row} key={rowIndex}>
          {row.map((color, index) => {
            return <BoardTile color={color} key={rowIndex + index} />;
          })}
        </View>
      );
    });
  }

  render() {
    const { addPieceToBoard: addPiece } = this.props;

    return (
      <TouchableOpacity onPress={() => addPiece()} style={styles.board}>
        {this.renderRows()}
      </TouchableOpacity>
    );
  }
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  addPieceToBoard: PropTypes.func.isRequired,
  movePieceDown: PropTypes.func.isRequired
};

const mapStateToProps = ({ board }) => {
  return {
    board: board.map(row => row.map(tile => (tile ? tile.color : 'white')))
  };
};

export default connect(
  mapStateToProps,
  { addPieceToBoard, movePieceDown }
)(Board);
