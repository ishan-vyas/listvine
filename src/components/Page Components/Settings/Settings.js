import React from "react";
import './Settings.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";

function Settings(){
    return(
        <div className="main-settings-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="settings-div">
                <ActionBar />
            </div>
        </div>
    );
}

export default Settings;