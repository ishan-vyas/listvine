import {React, useState} from 'react';
import Button from '../Button';
import TextInput from '../TextInputs/TextInput';
import { useAuth } from '../../../context/UserAuthContext';

import './ChangePassword.css';

const ChangePassword = (props) => {

    const [password, setPassword] = useState("");

    return(
        <div className="modalBackground">
            <div className='modalContainer'>
                <div className="modal-title">
                    <h1>Change Password</h1>
                </div>
                <div className="modal-body">
                <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'>Current Password:</TextInput>
                <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'>New Current Password:</TextInput>
                <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'>Confirm Current Password:</TextInput>
                </div>
                <div className="modal-footer">
                    <Button onClick={props.cancelHandler} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Cancel</Button>
                    <Button onClick={props.chanegPwHandler} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Change Password</Button>
                </div>
            </div>
        </div>

    );
};

export default ChangePassword;