import React from "react";
import './Button.css';

function Button(props){
    return(
        <button type={props.type} onClick={props.onClick} style={props.style}>{props.children}</button>
    );
}

export default Button;