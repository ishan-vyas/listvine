import React from "react";
import './Newsfeed.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import ListPost from "../../UI Components/ListPost/ListPost";
import Confirm from "../../UI Components/Modals/Confirm";
import { useState } from "react";

function Newsfeed(){

    const [confirmState, setConfirmState] = useState(true);

    const confirmHandler = () => {
        setConfirmState(false);
    }

    const cancelHandler = () => {
        setConfirmState(false);
    }

    return(
        <div className="main-newsfeed-div">
            <Navbar>Ishan Vyas</Navbar>
            {confirmState && (<Confirm confirmHandler={confirmHandler} cancelHandler={cancelHandler} title="Are you sure you want to publish?">
                You are about to delete this list, it will no longer show up in your 'My Lists' Section.
            </Confirm>)}
            <div className="newsfeed-div">
                <div className="quicklist-div"></div>
                <div className="livelist-div">
                    <ListPost />
                    <ListPost />
                    <ListPost />
                    <ListPost />
                    <ListPost />
                    <ListPost />
                </div>
                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default Newsfeed;