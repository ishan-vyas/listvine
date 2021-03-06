import React from 'react';
import './TextInput.css';

const TextInput = (props) => {
    return(
        <div className="input-holder" style={props.style}>
            <label style={{fontFamily:'Roboto'}}className="input-label">{props.children}</label>
            <input onChange={props.onChange} value={props.value} style={props.inputStyle} type={props.type}></input>
        </div>
    );
}

export default TextInput;