import React from 'react';
import Overlay from '../../UI Components/Overlay';
import TextInput from '../../UI Components/TextInputs/TextInput';
import Button from '../../UI Components/Button';
import { Link } from "react-router-dom";
import './SignUp.css';

function SignUp(){
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
                        <form>
                            <TextInput type='text'>Username:</TextInput>
                            <TextInput type='password'>Password:</TextInput>
                            <TextInput type='password'>Confirm Password:</TextInput>
                            <div className='button-div'>
                                <Button>Sign Up</Button>
                            </div>
                        </form>
                    </div>
                    <div className='seperator-div'>
                        <div></div>
                        <p>or</p>
                        <div></div>
                    </div>
                    <p class="change-link">Already have an account? <Link to='/login'>
                    <u>Log In</u></Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;