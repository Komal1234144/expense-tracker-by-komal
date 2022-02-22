import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import { SpeechProvider} from '@speechly/react-client';

ReactDOM.render(
  <React.StrictMode>
  <SpeechProvider appId='650e4ded-159f-4ccf-8c2a-e8b6aee39f98' language='en-US'>
  <Provider store={store}>
    <App />
  </Provider>
  </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

