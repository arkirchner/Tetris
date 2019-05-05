import React from 'react';
import { render } from 'react-native-testing-library';
import App from '../App';

describe('App', () => {
  it('renders without crash', () => {
    const { toJSON } = render(<App />);

    expect(toJSON()).not.toBeNull();
  });
});
