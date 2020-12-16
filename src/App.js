import React from "react";
import {connect} from "react-redux";
import Minus from "./buttons/minus"
import Pause from "./buttons/pause";
import Play from "./buttons/play";
import moment from "moment";

class App extends React.Component {

    addTrack = (event) => {
        event.preventDefault();
        this.props.onAddTrack({
            title: this.trackInput.value || `track${Date.now()}`,
            time: moment().format("DD MM YYYY hh:mm:ss"),
            playing: false
        });
        this.trackInput.value = '';
    }
    toggle(index) {
        const payload = [index, moment().format("DD MM YYYY hh:mm:ss")]
        this.props.timeGo(payload)
    }

    render() {

        return (
            <div className="container">
                <h1>Tracker</h1>
                <div className="wrapper">
                    <form className="form">
                        <input ref={(input) => this.trackInput = input} type="text" placeholder="Enter tracker name"/>
                        <button type='submit' onClick={this.addTrack.bind(this)}><Play color="green" width="50"/></button>
                    </form>
                    <div className="tracker-list">
                        {this.props.playlist.map((tracker, index) => (
                            <div key={index} className="tracker">
                                <h3>{tracker.title}</h3>
                                <h4>{tracker.time}</h4>
                                <div className="action">
                                    <button onClick={this.toggle.bind(this)(index)}>{tracker.playing ? <Pause/> :
                                        <Play/>}</button>
                                    <button><Minus/></button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        );
    }

}

export default connect(
    state => ({
        playlist: state
    }),
    dispatch => ({
        onAddTrack: (tracker) => {
            dispatch({type: 'ADD_TRACK', payload: tracker});
        },
        timeGo: time => {
            dispatch({type: 'TIMER', payload: time})
        }
    })
)(App);
