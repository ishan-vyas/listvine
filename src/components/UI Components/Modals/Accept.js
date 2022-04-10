import React from 'react';
import './Confirm.css';
import Button from '../Button';

const Accept = (props) => {
    return(
        <div className="modalBackground" style={{color:'blue'}}>
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
                    <Button onClick={props.confirmHandler} style={{color: 'white'}}>Yes, I am Sure</Button>
                    <Button onClick={props.cancelHandler} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default Accept;