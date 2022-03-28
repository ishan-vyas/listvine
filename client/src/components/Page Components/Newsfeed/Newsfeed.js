import React from "react";
import './Newsfeed.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import ListPost from "../../UI Components/ListPost/ListPost";

function Newsfeed(){
    return(
        <div className="main-newsfeed-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="newsfeed-div">
                <div className="quicklist-div"></div>
                <div className="livelist-div">
                    <ListPost />
                    <ListPost />
                </div>
                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default Newsfeed;