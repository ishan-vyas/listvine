import React from "react";
import './DeleteButton.css';

function DeleteButton(props){
    return(
        <deletebutton>{props.children}</deletebutton>
    );
}

export default DeleteButton;