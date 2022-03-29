import React from "react";
import './Delete.css';

function Delete(props){
    return(
        <delete>{props.children}</delete>
    );
}

export default Delete;