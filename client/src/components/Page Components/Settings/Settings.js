import React, { useState } from "react";
import './Settings.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { Edit } from '@material-ui/icons';
import Confirm from "../../UI Components/Modals/Confirm";
import { useAuth } from "../../../context/UserAuthContext";


function Settings(){
    const [confirmIsOpen, setConfirmIsOpen] = useState(false);

    const { user, changeUsername, changePassword, deleteAccount } = useAuth();

    const deleteAccountHandler = async () => {
        try {
            await deleteAccount();
            setConfirmIsOpen(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        
        <div className="main-settings-div">
            <Navbar />
            {confirmIsOpen && (<Confirm confirmHandler={deleteAccountHandler} cancelHandler={() => {setConfirmIsOpen(false)}} title="Are you sure you want to delete this account?">
                        You are about to delete an entire account, you will no longer be able to access listvine anymore.
                        </Confirm>)}
            <div className="settings-div">
                <div className="general-div">
                    <div className="header-section">
                        <h1 id="general-title">General Settings</h1>
                    </div>
                    <div className="setting-seperator"></div>
                    <div className="setting-section">
                        <div className="username-section">
                            <p className="username-p">Username:</p>
                            <p className="text-p">{user.displayName}</p>
                            <div className="edit-actions">
                                <Edit fontSize="large"/>
                            </div>
                        </div>
                        <div className="email-section">
                            <p className="email-p">Email:</p>
                            <p className="emailtext-p">{user.email}</p>
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
                        <deletebutton style={{color:'red'}} onClick={() => setConfirmIsOpen(true)}><u>Delete Account</u></deletebutton>
                    </div>
                </div>
                <ActionBar style={{width:'15%', height:'50vh'}}/>
            </div>
        </div>
    );
}

export default Settings;