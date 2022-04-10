import {React, useState, useEffect } from 'react';
import Button from '../Button';
import TextInput from '../TextInputs/TextInput';
import { useAuth } from '../../../context/UserAuthContext';

import './ChangeUsername.css';

const ChangeUsername = (props) => {

    const { user } = useAuth();
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    },[password, newUsername]);

    const changeUsernamePress = async () => {
        try{
            await props.changeUsHandler(newUsername, password);
        }catch(error){
            setError(error?.message);
        }
    };

    return(
        <div className="modalBackground">
            <div className='modalContainer'>
                <div className="modal-title">
                    <h1>Change Username</h1>
                </div>
                <div className="modal-body">
                    <p style={{marginLeft:'15%'}}>Current Username:</p>
                    <br />
                    <p className='user'>{user.displayName}</p>
                    <TextInput value={newUsername} onChange={(e) => {setNewUsername(e.target.value)}} type='user'>Enter New Username:</TextInput>
                    <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'>Enter Password:</TextInput>
                    {error && (<p style={{margin:'0', padding:'0', color:'red', marginBottom:'1%', fontSize:'large', textAlign:'center'}}>{error}</p>)}
                </div>
                <div className="modal-footer">
                    <Button onClick={props.cancelHandler} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Cancel</Button>
                    <Button onClick={changeUsernamePress} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Change Username</Button>
                </div>
            </div>
        </div>

    );
};

export default ChangeUsername;