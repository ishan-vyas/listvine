import React from 'react';
import './TransparentTextInput.css';

const TransparentTextInput = (props) => {
    return(
        <div>
            <input class="transparent-input" type={props.type} defaultValue={props.defaultValue}></input>
        </div>
    );
}

export default TransparentTextInput;