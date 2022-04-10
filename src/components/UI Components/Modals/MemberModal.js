import React from 'react';
import './Confirm.css';
import Button from '../Button';

const MemberModal = (props) => {
    return(
        <div className="modalBackground" style={{color:'red'}}>
            <div className='modalContainer'>
                <div className="modal-title">
                    <h1>{props.title}</h1>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    <Button onClick={props.closeHandler} style={{backgroundColor: '#EDEFF2', color: 'black', marginRight:'5%'}}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default MemberModal;