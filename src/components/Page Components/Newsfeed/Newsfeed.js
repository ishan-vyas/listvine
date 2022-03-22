import React from "react";
import './Newsfeed.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";

function Newsfeed(){
    return(
        <div className="main-newsfeed-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="newsfeed-div">
                <ActionBar />
            </div>
        </div>
    );
}

export default Newsfeed;