import React from 'react';
import './MyListItem.css';
import { AddCircleOutline } from '@material-ui/icons';

function MyAddListItem(props) {

    return (

        <div className='list-item'>
            <div>
                <AddCircleOutline fontSize='large'/>
            </div>
            <p>{props.text}</p>
            
        </div>

    );
}

export default MyAddListItem;