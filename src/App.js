import React from "react";
import {connect} from "react-redux";
import Pause from "./buttons/pause";
import Play from "./buttons/play";
import moment from "moment";

class App extends React.Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.del = this.del.bind(this)
    }
    addTrack = (event) => {
        event.preventDefault();
        this.props.onAddTrack({
            title: this.trackInput.value || `track${Date.now()}`,
            time: moment( "00:0:00AM", "h:mm:ssA" ).format( "HH:mm:ss" ),
            playing: true
        });
        this.trackInput.value = '';
    }

    toggle(event) {

    }
    del(event) {
        this.props.deleteTrack(event.target.id);
    }

    render() {
        return (
            <div className="container">
                <h1>Tracker</h1>
                <div className="wrapper">
                    <form className="form">
                        <input ref={(input) => this.trackInput = input} type="text" placeholder="Enter tracker name"/>
                        <button className='add' type='submit' onClick={this.addTrack.bind(this)}><Play color='green' /></button>
                    </form>
                    {this.props.playlist.length
                        ? <div className="tracker-list">
                            {this.props.playlist.map((tracker, index) => (
                                <div key={index} className="tracker">
                                    <h3>{tracker.title}</h3>
                                    <h4>{tracker.time}</h4>
                                    <div className="action">
                                        <button onClick={this.toggle}>{tracker.playing ? <Pause id={index}/> : <Play id={index}/>}</button>
                                        <button id={index} className="del" onClick={this.del}></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <div className="notracks">No tracks</div>
                    }
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
        // timeGo: (time, index) => {
        //     dispatch({type: 'PLAY', payload: [time, index]})
        // }
        deleteTrack(index) {
            dispatch({type: 'DELETE_TRACK', payload: index})
        }
    })
)(App);
