import React from "react";
import './Newsfeed.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import ListPost from "../../UI Components/ListPost/ListPost";
import TransparentTextInput from "../../UI Components/TextInputs/TransparentTextInput";
import Button from "../../UI Components/Button";

function Newsfeed(){

    return(
        <div className="main-newsfeed-div">
            <Navbar />
            <div className="newsfeed-div">
                 <div className="quicklist-div">
                 <div className="create-list-div">
                    <div className="header">
                        <h1 id="quicklist-title">(ICON) Quick List</h1>
                    </div>
                    <div className="list-actions-section">
                        <input className="user-input" defaultValue="Add Title....."></input>
                        <div className="list-items-section">
                            <input className="list-items-checkbox" type="checkbox"></input>
                           <input className="user-input" defaultValue="Add Item....."></input>
                        </div>
                    </div>
                    <div className="users-section">
                     <input className="user-input" defaultValue="Add users....."></input>
                        
                    </div>
                    <div className="create-button-section">
                        <Button>Create</Button>
                    </div>
                </div>
                
                
                
                
                </div>
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