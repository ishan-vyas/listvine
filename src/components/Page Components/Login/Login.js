import React from 'react';
import Overlay from '../../UI Components/Overlay';
import TextInput from '../../UI Components/TextInputs/TextInput';
import Button from '../../UI Components/Button';
import { Link} from "react-router-dom";
import './Login.css';

function Login(props){

    const submitForm = (e) => {
        e.preventDefault();
        console.log('This is working');
    }

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
                        <form onSubmit={submitForm}>
                            <TextInput type='text'>Username:</TextInput>
                            <TextInput type='password'>Password:</TextInput>
                            <div className='button-div'>
                                <Link to="/home">
                                    <Button>Log In</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className='seperator-div'>
                        <div></div>
                        <p>or</p>
                        <div></div>
                    </div>
                    <p class="change-link">Don't have an account? <Link to='/signup'>
                    <u>Sign Up</u></Link> here.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;