import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import moment from "moment";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

localStorage.setItem('playList', JSON.stringify([
    {title: "Song1", time: moment().format("DD MM YYYY hh:mm:ss"), playing: false},
    {title: "Song2", time: moment().format("DD MM YYYY hh:mm:ss"), playing: false},
    {title: "Song3", time: moment().format("DD MM YYYY hh:mm:ss"), playing: false}
]))

const initialState = JSON.parse(localStorage.getItem('playList')) || [];

const playlist = (state = initialState, action) => {
    if (action.type === 'ADD_TRACK') {
        return [...state, action.payload]
    }
    return state
}

const store = createStore(playlist);

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
