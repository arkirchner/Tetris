import React from 'react';
import { render } from 'react-native-testing-library';
import BoardTile from '../BoardTile';

describe('BoardTile', () => {
  it('shows the tile', () => {
    const tile = 2;

    const { getByText } = render(<BoardTile tile={tile} />);

    expect(getByText(`${tile}`)).not.toBeNull();
  });
});
