import React from 'react';
import './MyListItem.css';
import { DeleteOutline } from '@material-ui/icons';
// import CheckContainer from './CheckContainer';
// import DeleteIconContainer from './DeleteIconContainer';

function MyListItem(props) {

    return (

        <div className='list-item'>
            {/* <DeleteIconContainer/> */}
            <div>
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