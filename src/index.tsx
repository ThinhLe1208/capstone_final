import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import GlobalStyles from 'components/GlobalStyles';
import store from 'redux/configureStore';
import themeConfig from 'utils/antdTheme.json';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <ConfigProvider theme={themeConfig}>
          <App />
        </ConfigProvider>
      </GlobalStyles>
    </Provider>
  </React.StrictMode>
);
