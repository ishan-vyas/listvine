import {React, useState} from 'react';
import Overlay from '../../UI Components/Overlay';
import TextInput from '../../UI Components/TextInputs/TextInput';
import Button from '../../UI Components/Button';
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from '../../../context/UserAuthContext';

import './Login.css';

function Login(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError ] = useState("");
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            await logIn(email, password);
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='main-div'>
            <div className='overlay-div'>
                <Overlay />
            </div>
            <div className='login-div'>
                <div className='login-form-div'>
                    <div className='logo-div'>
                        <h1>listvine</h1>
                    </div>
                    <div className='form-div'>
                        <form onSubmit={loginHandler}>
                        <TextInput value={email} onChange={(e) => {setEmail(e.target.value)}} type='text'>Email:</TextInput>
                            <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'>Password:</TextInput>
                            {error && (<p style={{margin:'0', padding:'0', color:'red', marginBottom:'1%', fontSize:'large', textAlign:'center'}}>{error}</p>)}
                            <div className='button-div'>
                                <Button type="submit">Log In</Button>
                            </div>
                        </form>
                    </div>
                    <div className='seperator-div'>
                        <div></div>
                        <p>or</p>
                        <div></div>
                    </div>
                    <p className="change-link">Don't have an account? <Link to='/signup'>
                    <u>Sign Up</u></Link> here.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;