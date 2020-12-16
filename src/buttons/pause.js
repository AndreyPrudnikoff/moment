import React from "react";

function Minus(props) {
    return (
        <svg id={props.id} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle"
             width="30" role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512">
            <path fill="#000"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path>
        </svg>
    );
}

export default Minus;
