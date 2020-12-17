import React from "react";
import { connect } from "react-redux";
import Play from "./buttons/play";
import moment from "moment";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.del = this.del.bind(this)
        this.pause = this.pause.bind(this)
    }

    componentDidMount() {
        this.toggle(null)
    }

    addTrack = (event) => {
        event.preventDefault();
        this.props.onAddTrack({
            title: this.trackInput.value || `track${Date.now()}`,
            time: moment("0:0:0AM", "h:mm:ssA").format("HH:mm:ss"),
            playing: true,
            created: Date.now(),
            pause: 0,
            pauseTime: 0
        });
        this.trackInput.value = '';
    }

    toggle(event) {
        if (event) {
            this.props.timeGo(event.target.id);
            setInterval(() => this.props.timeGo(), 1000);
        } else {
            setInterval(() => this.props.timeGo(), 1000);
        }
    }

    pause(event) {
        if (event) {
            this.props.pauseTrack(event.target.id);
        }
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
                        <button className='add' type='submit' onClick={this.addTrack.bind(this)}><Play color='green'/>
                        </button>
                    </form>
                    {this.props.playlist.length
                        ? <div className="tracker-list">
                            {this.props.playlist.map((track, index) => (
                                <div key={index} className="tracker">
                                    <h3>{track.title}</h3>
                                    <h4>{track.time}</h4>
                                    <div className="action">
                                        {!track.playing ?
                                            <button id={index} className='play' onClick={this.toggle}>
                                            </button> :
                                            <button id={index} className='pause' onClick={this.pause}>
                                            </button>
                                        }
                                        <button id={index} className="del" onClick={this.del}>
                                        </button>
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
        timeGo: (id) => {
            dispatch({type: 'PLAY', payload: id})
        },
        deleteTrack(index) {
            dispatch({type: 'DELETE_TRACK', payload: index})
        },
        pauseTrack(id) {
            dispatch({type: 'PAUSE', payload: id})
        }
    })
)(App);
