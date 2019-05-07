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
          {row.map((tile, index) => (
            <BoardTile tile={tile} key={rowIndex + index} />
          ))}
        </View>
      );
    });
  }

  render() {
    const { addPieceToBoard: addPiece } = this.props;

    return (
      <TouchableOpacity onPress={() => addPiece([[1, 1], [1, 1]])} style={styles.board}>
        {this.renderRows()}
      </TouchableOpacity>
    );
  }
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  addPieceToBoard: PropTypes.func.isRequired,
  movePieceDown: PropTypes.func.isRequired
};

const mapStateToProps = ({ board }) => ({ board });

export default connect(
  mapStateToProps,
  { addPieceToBoard, movePieceDown }
)(Board);
