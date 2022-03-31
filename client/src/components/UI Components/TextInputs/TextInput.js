import React from 'react';
import './TextInput.css';

const TextInput = (props) => {
    return(
        <div className="input-holder" style={props.style}>
            <label className="input-label">{props.children}</label>
            <input onChange={props.onChange} style={props.inputStyle} type={props.type}></input>
        </div>
    );
}

export default TextInput;