import React from 'react';
import './MyListItem.css';
import { AddCircleOutline } from '@material-ui/icons';

const MyAddListItem = (props) => {
    return (
        <form className = 'list-item' onSubmit={(e) => e.preventDefault()}>
            <div className='clickable-icon'>
                <AddCircleOutline  onClick={props.onClick} fontSize='large'/>
            </div>
            <div className="check-container">
                <div className="circular-check"></div>
            </div>
            <input onKeyPress={props.onKeyPress} value={props.value} onChange={props.onChange} type="text" placeholder='Add new list item...' size="80"></input>
        </form>
    );
}

export default MyAddListItem;