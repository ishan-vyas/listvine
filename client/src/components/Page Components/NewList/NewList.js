import React from "react";
import './NewList.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import Button from "../../UI Components/Button";
import TransparentTextInput from "../../UI Components/TextInputs/TransparentTextInput";

function NewList(){

    const submitNewList = (e) => {
        e.preventDefault();
        console.log('hello');
    }

    const setTitle = (e) => {

    }

    const addItem = (e) => {

    }

    const addMember = (e) => {}

    return(
        <div className="main-newlist-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="newlist-div">
                <div className="create-div">
                    <div className="header-section">
                        <h1 id="newlist-title">Create New List</h1>

                    </div>
                    <div className="list-section">
                        <TransparentTextInput defaultValue="Add Title ..."/>
                        <div className="listitem-section">
                            <input className="listitem-checkbox" type="checkbox"></input>
                            <TransparentTextInput defaultValue="Add Item ..."/>
                        </div>
                    </div>
                    <div className="user-section">
                        
                    </div>
                    <div className="button-section">
                        <Button>Create</Button>
                    </div>
                </div>
                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default NewList;