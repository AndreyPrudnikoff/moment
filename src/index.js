import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import moment from 'moment';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function timer(createdTrack) {
    const created = createdTrack || Date.now();
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    seconds = Math.round(((Date.now() - created) / 1000));
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        if (minutes >= 60) {
            hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
        }
    }
    console.log(`${hours}:${minutes}:${seconds}`)
    return `${hours}:${minutes}:${seconds}`
}

const initialState = JSON.parse(localStorage.getItem('playList')) || [];

const playlist = (state = initialState, action) => {
    if (action.type === 'ADD_TRACK') {
        let newState = [action.payload, ...state];
        localStorage.setItem('playList', JSON.stringify(newState));
        return newState;
    } else if (action.type === 'PLAY') {
        setInterval(() => {
            let newState = state.map((track, index) => {
                if (index === parseInt(action.payload)) {
                    track.time = moment(`${timer(parseInt(track.created))}AM`, "h:mm:ssA").format("HH:mm:ss");
                } else return track;
                return track;
            });
            localStorage.setItem('playList', JSON.stringify(newState));
            return state;
        }, 1000)
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
