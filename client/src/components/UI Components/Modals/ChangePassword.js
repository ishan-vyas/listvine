import {React, useEffect, useState} from 'react';
import Button from '../Button';
import TextInput from '../TextInputs/TextInput';
import { useAuth } from '../../../context/UserAuthContext';

import './ChangePassword.css';

const ChangePassword = (props) => {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    },[password, newPassword, confirmNewPassword]);

    const changePasswordPress = async () => {
        try {
            await props.changePwHandler(password, newPassword);
        } catch (error) {
            setError(error?.message);
        }
    }

    return(
        <div className="modalBackground">
            <div className='modalContainer'>
                <div className="modal-title">
                    <h1>Change Password</h1>
                </div>
                <div className="modal-body">
                <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'>Current Password:</TextInput>
                <TextInput value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} type='password'>New Password:</TextInput>
                <TextInput value={confirmNewPassword} onChange={(e) => {setConfirmNewPassword(e.target.value)}} type='password'>Confirm New Password:</TextInput>
                {error && (<p style={{margin:'0', padding:'0', color:'red', marginBottom:'1%', fontSize:'large', textAlign:'center'}}>{error}</p>)}
                </div>
                <div className="modal-footer">
                    <Button onClick={props.cancelHandler} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Cancel</Button>
                    <Button onClick={changePasswordPress} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Change Password</Button>
                </div>
            </div>
        </div>

    );
};

export default ChangePassword;