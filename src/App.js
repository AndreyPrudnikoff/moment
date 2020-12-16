import React from "react";
import {connect} from "react-redux";
import Play from "./buttons/play";
import moment from "moment";


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
            time: moment( "0:0:0AM", "h:mm:ssA" ).format( "HH:mm:ss" ),
            playing: true,
            created: Date.now()
        });
        this.trackInput.value = '';
    }

    toggle(event) {
        this.props.timeGo(event.target.id);
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
                        <input ref={(input) => this.trackInput = input} type="text" placeholder="Enter track name"/>
                        <button className='add' type='submit' onClick={this.addTrack.bind(this)}><Play color='green' /></button>
                    </form>
                    {this.props.playlist.length
                        ? <div className="tracker-list">
                            {this.props.playlist.map((track, index) => (
                                <div key={index} className="tracker">
                                    <h3>{track.title}</h3>
                                    <h4>{track.time}</h4>
                                    <div className="action">
                                        <button id={index} className={track.playing ? 'pause' : 'play'} onClick={this.toggle}> </button>
                                        <button id={index} className="del" onClick={this.del}> </button>
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

export default connect(state => ({
        playlist: state
    }),
    dispatch => ({
        onAddTrack: (track) => {
            dispatch({type: 'ADD_TRACK', payload: track});
        },
        timeGo: (index) => {
            dispatch({type: 'PLAY', payload: index})
        },
        deleteTrack(index) {
            dispatch({type: 'DELETE_TRACK', payload: index})
        }
    })
)(App);
