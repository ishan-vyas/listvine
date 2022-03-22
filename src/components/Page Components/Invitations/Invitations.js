import React from "react";
import './Invitations.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";

function Invitations(){
    return(
        <div className="main-invitations-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="invitations-div">
                <div className="friend-div">
                </div>
                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default Invitations;