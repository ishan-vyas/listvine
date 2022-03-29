import React from "react";
import './Settings.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import Delete from "../../UI Components/Delete";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { Edit } from '@material-ui/icons';


function Settings(){
    return(
        <div className="main-settings-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="settings-div">
                <div className="general-div">
                    <div className="header-section">
                        <h1 id="general-title">General Settings</h1>
                    </div>
                    <div className="setting-seperator"></div>
                    <div className="setting-section">
                        <div className="username-section">
                            <p className="username-p">Username:</p>
                            <p className="text-p">Ishan Vyas</p>
                            <div className="edit-actions">
                                <Edit fontSize="large"/>
                            </div>
                        </div>
                        <div className="email-section">
                            <p className="email-p">Email:</p>
                            <p className="emailtext-p">ishan.random01@gmail.com</p>
                        </div>
                        <div className="password-section">
                            <p className="password-p">Password: </p>
                            <p className="text-p">*********</p>
                            <div className="edit-actions">
                                <Edit fontSize="large"/>
                            </div>
                        </div>
                        

                    </div>
                    <div className="setting-seperator"></div>
                    <div className="delete-section">
                        <Delete>Delete Account</Delete>
                    </div>
                </div>
                <ActionBar style={{width:'15%', height:'50vh'}}/>
            </div>
        </div>
    );
}

export default Settings;