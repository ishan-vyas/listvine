import React from 'react';
import './TransparentTextInput.css';

const TransparentTextInput = (props) => {
    return(
        <div>
            <input value={props.val} onInput={props.onInput} onKeyPress={props.onKeyPress} className="transparent-input" type={props.type} defaultValue={props.defaultValue}></input>
        </div>
    );
}

export default TransparentTextInput;