import React from 'react';
import {render} from 'react-dom';
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const store = createStore(rootReducer);

const app = (
        <App/>
);

render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
