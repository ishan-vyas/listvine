import React from "react";
import './Invitations.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { Close } from "@material-ui/icons";

const UserTag = (props) => {
    return(
        <div className="usertag">
            <div className="color-container" style={{backgroundColor:props.bg}}>
                <div className="usercolor">
                </div>
            </div>
            <p>{props.children}</p>
        </div>
    );
}

const InviteItem = (props) => {
    return(
        <div className="invite-div">
            <div className="Inviter-div">
                <UserTag bg="green">Christopher Schultze</UserTag>
                    <div className="list-info-section">
                    <p className="view-list-button"> View</p>
                    <p className="list-title">TO-DO List</p>
                    </div>
            </div>
                <div className="accept-reject-section">
                    <p className="accept-button"> Accept</p>
                   <p className="close-button">x</p>
                </div>
        </div>
    );
}

function Invitations(){

    const viewList = (e) => {}


    const acceptInvite = (e) => {}


    const rejectInvite = (e) => {}
 




    return(
        <div className="main-invitations-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="invitations-div">
                <div className="friends-div">
                    <div className="header">
                        <h1 id="invitations-title">Invitations</h1>
                    </div>
                        <div className="invites-list">
                        <InviteItem></InviteItem>
                        <InviteItem></InviteItem>
                        <InviteItem></InviteItem>
                        <InviteItem></InviteItem>
                        </div>
                </div>
                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default Invitations;