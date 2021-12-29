import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
  rootReducer,composeWithDevTools(
    

));

const persistor = persistStore(store);

ReactDOM.render(
  <Router>
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>
  </Router>
  ,
  document.getElementById('root')
);

