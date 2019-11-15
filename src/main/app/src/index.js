import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
// import App from './containers/app';
import App from './containers/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'sanitize.css/sanitize.css';
import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="app-react-spring">
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
