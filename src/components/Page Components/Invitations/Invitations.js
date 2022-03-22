import React from "react";
import './Invitations.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";

function Invitations(){
    return(
        <div className="main-invitations-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="invitations-div">
                <ActionBar />
            </div>
        </div>
    );
}

export default Invitations;