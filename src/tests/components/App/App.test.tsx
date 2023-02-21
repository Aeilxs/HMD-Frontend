import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../components/App/App';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

describe('App components test suites', () => {
  it('should render nav', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const nav = screen.getByText('HMD');
    expect(nav).toBeInTheDocument();
  });

  it('should render footer', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const footer = screen.getByText('Nos réseaux');
    expect(footer).toBeInTheDocument();
  });
});
