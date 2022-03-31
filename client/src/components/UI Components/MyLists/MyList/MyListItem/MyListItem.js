import React from 'react';
import './MyListItem.css';
import { DeleteOutline } from '@material-ui/icons';

function MyListItem(props) {

    return (

        <div className='list-item'>
            {/* <DeleteIconContainer/> */}
            <div className='clickable-icon'>
                <DeleteOutline fontSize='large'/>
            </div>
            <div className="check-container">
                <div className="circular-check"></div>
            </div>

            <p>{props.text}</p>
            
        </div>

    );
}

export default MyListItem;