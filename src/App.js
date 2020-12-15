import React from "react";
import Minus from "./buttons/minus"
import Pause from "./buttons/pause";
import Play from "./buttons/play";

function App() {
    let flag = false;
    const toggle = () => {
        flag = !flag
    }
    let btn = flag ? <Play /> : <Pause />;

    return (
        <div className="container">
            <h1>Tracker</h1>
            <div className="wrapper">
                <div className="form">
                    <input onClick={toggle} type="text" placeholder="Enter tracker name"/>
                    <Play color="green" width="50"/>
                </div>
                <div className="track">
                    <h3>Title</h3>
                    <h4>Time</h4>
                    { btn }
                    <Minus/>
                </div>
            </div>

        </div>
    );
}

export default App;
