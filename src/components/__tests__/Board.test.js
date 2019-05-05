import React from 'react';
import { render } from 'react-native-testing-library';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Board from '../Board';
import BoardTile from '../BoardTile';
import boardReducer from '../../reducers/board';

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
});
