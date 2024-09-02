import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './App';
// import './index.css';
import { createStore } from 'redux';

// import allreducers from "./redux/reducers/recipeReducers"
import reducers from './redux/reducers';

const store = createStore(reducers);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
