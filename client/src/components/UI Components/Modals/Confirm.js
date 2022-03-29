import React from 'react';
import './Confirm.css';
import Button from '../Button';

const Confirm = (props) => {
    return(
        <div className="modalBackground" style={{color:'red'}}>
            <div className='modalContainer'>
                <div className="modal-title">
                    <h1>{props.title}</h1>
                </div>
                <div className="modal-body">
                    <p>Note:</p>
                    <br />
                    <p>{props.children}</p>
                </div>
                <div className="modal-footer">
                    <Button onClick={props.cancelHandler} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Cancel</Button>
                    <Button onClick={props.confirmHandler} style={{backgroundColor: '#EA4335', color: 'white'}}>Yes, I am Sure</Button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;