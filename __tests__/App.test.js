import React from 'react';
import { render } from 'react-native-testing-library';
import App from '../App';
import Board from '../src/components/Board';

describe('App', () => {
  it('renders without crash', () => {
    const { toJSON } = render(<App />);

    expect(toJSON()).not.toBeNull();
  });

  it('renders the game board', () => {
    const { getByType } = render(<App />);

    expect(getByType(Board)).not.toBeNull();
  });
});
