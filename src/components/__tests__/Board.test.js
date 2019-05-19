import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Board, { INTERVAL } from '../Board';
import BoardTile from '../BoardTile';
import BoardButton from '../BoardButton';
import boardReducer from '../../reducers/board';
import { updateBoard } from '../../actions';

const middlewares = [thunk];
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
      expect(store.getActions()).toEqual([updateBoard(), updateBoard()]);
      done();
    }, INTERVAL * 2 + 50);
  });

  it('updates the board when a tile is pressed', () => {
    const store = mockStore({ board: boardReducer(undefined, {}) });
    const { getAllByType } = render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    fireEvent.press(getAllByType(BoardButton)[1]);

    expect(store.getActions()).toEqual([updateBoard()]);
  });
});
