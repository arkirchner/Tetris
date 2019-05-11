import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Board, { INTERVAL } from '../Board';
import BoardTile from '../BoardTile';
import boardReducer from '../../reducers/board';
import { movePieceDown, addPieceToBoard } from '../../actions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Board', () => {
  it('shows all tiles', () => {
    const store = mockStore({ board: boardReducer(undefined, {}) });
    const { getAllByType } = render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    expect(getAllByType(BoardTile).length).toEqual(20 * 12);
  });

  it('calls the drop actions in intervals', done => {
    const store = mockStore({ board: boardReducer(undefined, {}) });
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    setTimeout(() => {
      expect(store.getActions()).toEqual([movePieceDown(), movePieceDown()]);
      done();
    }, INTERVAL * 2 + 50);
  });

  it('places a block when a tile is pressed', () => {
    const store = mockStore({ board: boardReducer(undefined, {}) });
    const { getAllByType } = render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    fireEvent.press(getAllByType(BoardTile)[0]);

    expect(store.getActions()).toEqual([addPieceToBoard([[1, 1], [1, 1]])]);
  });
});