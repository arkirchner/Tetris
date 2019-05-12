import React from 'react';
import { render } from 'react-native-testing-library';
import compact from 'lodash/compact';
import BoardTile from '../BoardTile';
import randomTetromino from '../../tetrominos';

describe('BoardTile', () => {
  it('renders without error', () => {
    const { color } = compact(randomTetromino()[0])[0];

    const { getByType } = render(<BoardTile color={color} />);

    expect(getByType(BoardTile)).not.toBeNull();
  });
});
