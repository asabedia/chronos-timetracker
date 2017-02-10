import React from 'react';
import './assets/stylesheets/main.less';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ipcRenderer as ipc } from 'electron';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Base from './components/Base/Base';

const store = configureStore();

window.onerror = (...argw) => {
  ipc.send('errorInWindow', argw);
};

render(
  <AppContainer>
    <Provider store={store}>
      <Base />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/Base/Base', () => {
    const Base = require('./components/Base/Base');
    render(
      <AppContainer>
        <Provider store={store}>
          <Base />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
