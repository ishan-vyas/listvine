import React from 'react';
import './TextInput.css';

const TextInput = (props) => {
    return(
        <div>
            <label>{props.children}</label>
            <br />
            <input type={props.type}></input>
        </div>
    );
}

export default TextInput;