import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../UI Components/Overlay';
import TextInput from '../../UI Components/TextInputs/TextInput';
import Button from '../../UI Components/Button';
import { Link } from "react-router-dom";
import './SignUp.css';
import { useAuth } from '../../../context/UserAuthContext';

function SignUp(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError ] = useState("");
    const { signUp } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setError("");
    },[username, email, password]);

    const signUpHandler = async (e) => {
        e.preventDefault();
        if(username.length < 6){
            setError("Username has to be longer than 6 characters");
            return;
        }
        else if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }else{
            try {
                await signUp(username, email, password);
                navigate("/");
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className='main-div'>
            <div className='overlay-div'>
                <Overlay />
            </div>
            <div className='signup-div'>
                <div className='signup-form-div'>
                    <div className='logo-div'>
                        <h1>listvine</h1>
                    </div>
                    <div className='form-div'>
                        <form onSubmit={signUpHandler}>
                            <TextInput value={username} onChange={(e) => {setUsername(e.target.value)}} type='text'>Username:</TextInput>
                            <TextInput value={email} onChange={(e) => {setEmail(e.target.value)}} type='text'>Email:</TextInput>
                            <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}} type='password'>Password:</TextInput>
                            <TextInput value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} type='password'>Confirm Password:</TextInput>
                            {error && (<p style={{margin:'0', padding:'0', color:'red', marginBottom:'1%', fontSize:'large', textAlign:'center'}}>{error}</p>)}
                            <div className='button-div'>
                                <Button type="submit">Sign Up</Button>
                            </div>
                        </form>
                    </div>
                    <div className='seperator-div'>
                        <div></div>
                        <p>or</p>
                        <div></div>
                    </div>
                    <p className="change-link">Already have an account? <Link to='/'>
                    <u>Log In</u></Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;