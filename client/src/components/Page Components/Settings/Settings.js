import React, { useState } from "react";
import Modal from './Modal'
import './Settings.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import DeleteButton from "../../UI Components/DeleteButton";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { Edit } from '@material-ui/icons';


function Settings(){
    const [isOpen, setIsOpen] = useState(false)
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
                        <div className="modal-bg">
                            <div className="modal">
                                <h2>Are you sure you want to delete this account?</h2>
                                <label for="note">deleting this account will lead to permanent oss of data</label>
                            </div>
                        </div>
                        <deletebutton onClick={() => setIsOpen(true)}>Delete Account</deletebutton>
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            Test
                        </Modal>

                    </div>
                </div>
                <ActionBar style={{width:'15%', height:'50vh'}}/>
            </div>
        </div>
    );
}

export default Settings;