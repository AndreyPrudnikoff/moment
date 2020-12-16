import React from "react";
import {connect} from "react-redux";
import moment from 'moment';
import Minus from "./buttons/minus"
import Pause from "./buttons/pause";
import Play from "./buttons/play";

class App extends React.Component {
    constructor() {
        super();
        this.state = {flag: false};
    }

    toggle = () => {
        console.log()
        this.setState({flag: this.flag = !this.flag});
    }

    render() {
        // let {flag} = this.state;
        // let btn = flag ? <Pause/> : <Play/>;
        return (
            <div className="container">
                <h1>Tracker</h1>
                <div className="wrapper">
                    <div className="form">
                        <input type="text" placeholder="Enter tracker name"/>
                        <button><Play color="green" width="50"/></button>
                    </div>
                    <div className="track-list">
                        {this.props.playlist.map((track, index) => (
                            <div key={ index } className="track">
                                <h3>{ track.title }</h3>
                                <h4>{ track.time }</h4>
                                <div>
                                    <button onClick={this.toggle}>{ track.playing ? <Pause/> : <Play/> }</button>
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
    dispatch => ({})
)(App);
