import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App render', () => {
  test('Header is shown correctly', () => {
    render(<App />);
  });
});
