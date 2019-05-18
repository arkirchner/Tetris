import React from 'react';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import boardReducer from '../../reducers/board';
import BoardTile from '../BoardTile';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BoardTile', () => {
  it('renders without error', () => {
    const store = mockStore({ board: boardReducer(undefined, {}) });
    const { getByType } = render(
      <Provider store={store}>
        <BoardTile row={1} column={1} />
      </Provider>
    );

    expect(getByType(BoardTile)).not.toBeNull();
  });
});
