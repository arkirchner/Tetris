import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoardTile from './BoardTile';
import BoardButton from './BoardButton';
import { BOARD_SIZE } from '../tetris';
import { updateBoard, movePieceLeft, movePieceRight } from '../actions';

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
  },
  tile: {
    flex: 1
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
    return Array(BOARD_SIZE.rows)
      .fill()
      .map((_, rowIndex) => {
        return (
          <View style={styles.row} key={rowIndex}>
            {Array(BOARD_SIZE.columns)
              .fill()
              .map((_, columnIndex) => {
                return (
                  <View style={styles.tile} key={`${rowIndex}${columnIndex}`}>
                    <BoardTile row={rowIndex} column={columnIndex} />
                  </View>
                );
              })}
          </View>
        );
      });
  }

  render() {
    const { updateBoard: update, movePieceLeft: moveLeft, movePieceRight: moveRight } = this.props;

    return (
      <View style={styles.board}>
        {this.renderRows()}
        <View style={styles.menu}>
          <BoardButton icon="md-arrow-round-back" onPress={() => moveLeft()} />
          <BoardButton icon="md-arrow-round-down" onPress={() => update()} />
          <BoardButton icon="md-arrow-round-forward" onPress={() => moveRight()} />
        </View>
      </View>
    );
  }
}

Board.propTypes = {
  movePieceLeft: PropTypes.func.isRequired,
  movePieceRight: PropTypes.func.isRequired,
  updateBoard: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateBoard, movePieceLeft, movePieceRight }
)(Board);
