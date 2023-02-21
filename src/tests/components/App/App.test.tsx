import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../components/App/App';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from '@remix-run/router';

describe('App components test suites', () => {
  it('should render nav', () => {
    const history = createMemoryHistory();
    render(
      <Router
        location={history.location}
        navigator={history}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    const nav = screen.getByText('HMD');
    expect(nav).toBeInTheDocument();
  });

  it('should render footer', () => {
    const history = createMemoryHistory();
    render(
      <Router
        location={history.location}
        navigator={history}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    const footer = screen.getByText('Nos réseaux');
    expect(footer).toBeInTheDocument();
  });
});
