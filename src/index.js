import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import moment from 'moment';
import timer from './timer';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const initialState = JSON.parse(localStorage.getItem('playList')) || [];

const playlist = (state = initialState, action) => {
    if (action.type === 'ADD_TRACK') {
        let newState = [action.payload, ...state];
        localStorage.setItem('playList', JSON.stringify(newState));
        return newState;
    } else if (action.type === 'PLAY') {
        let newState = state.map((track, index) => {
            if (index === parseInt(action.payload)) {
                track.playing = true;
                track.pauseTime += Date.now() - track.pause;
            }
            if (track.playing) {
                track.time = moment(`${timer(parseInt(track.created), parseInt(track.pauseTime))}AM`, "h:mm:ssA").format("HH:mm:ss");
            }
            return track;
        });
        localStorage.setItem('playList', JSON.stringify(newState));
        return newState;
    } else if (action.type === 'PAUSE') {
        let newState = state.map((track, index) => {
            if (index === parseInt(action.payload)) {
                track.pause = Date.now();
                track.playing = false;
            }
            return track;
        });
        localStorage.setItem('playList', JSON.stringify(newState));
        return newState;
    } else if (action.type === 'DELETE_TRACK') {
        let newState = state.filter((track, index) => index !== parseInt(action.payload));
        localStorage.setItem('playList', JSON.stringify(newState));
        return newState;
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
