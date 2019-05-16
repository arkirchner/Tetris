import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoardTile from './BoardTile';
import BoardButton from './BoardButton';
import { addPieceToBoard, updateBoard, movePieceLeft, movePieceRight } from '../actions';

const styles = StyleSheet.create({
  board: { flex: 1 },
  row: { flex: 1, flexDirection: 'row' },
  menu: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '15%',
    opacity: 0.3
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const INTERVAL = 500;

class Board extends Component {
  componentDidMount() {
    const { updateBoard: update } = this.props;

    this.dropInterval = setInterval(update, INTERVAL);
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
    const {
      addPieceToBoard: addPiece,
      movePieceLeft: moveLeft,
      movePieceRight: moveRight
    } = this.props;

    return (
      <View style={styles.board}>
        {this.renderRows()}
        <View style={styles.menu}>
          <BoardButton icon="md-arrow-round-back" onPress={() => moveLeft()} />
          <BoardButton icon="md-arrow-round-down" onPress={() => addPiece()} />
          <BoardButton icon="md-arrow-round-forward" onPress={() => moveRight()} />
        </View>
      </View>
    );
  }
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  addPieceToBoard: PropTypes.func.isRequired,
  movePieceLeft: PropTypes.func.isRequired,
  movePieceRight: PropTypes.func.isRequired,
  updateBoard: PropTypes.func.isRequired
};

const mapStateToProps = ({ board }) => {
  return {
    board: board.map(row => row.map(tile => (tile ? tile.color : 'white')))
  };
};

export default connect(
  mapStateToProps,
  { addPieceToBoard, updateBoard, movePieceLeft, movePieceRight }
)(Board);
