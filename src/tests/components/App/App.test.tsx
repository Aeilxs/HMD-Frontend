import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../components/App/App';

describe('App components test suites', () => {
  it('should render nav', () => {
    render(<App />);
    const header = screen.getByText('HMD');
    expect(header).toBeInTheDocument();
  });

  it('should render footer', () => {
    render(<App />);
    const footer = screen.getByText('Nos réseaux');
    expect(footer).toBeInTheDocument();
  });
});
