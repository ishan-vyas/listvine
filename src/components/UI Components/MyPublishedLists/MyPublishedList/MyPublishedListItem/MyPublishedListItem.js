import React from 'react';
import './MyPublishedListItem.css';

function MyPublishedListItem(props) {

    return (

        <div className='publishedlist-item'>
            <p>{props.text}</p>    
        </div>

    );
}

export default MyPublishedListItem;