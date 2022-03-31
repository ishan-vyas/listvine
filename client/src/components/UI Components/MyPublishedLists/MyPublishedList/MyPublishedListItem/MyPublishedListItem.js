import React from 'react';
import './MyPublishedListItem.css';

function MyPublishedListItem(props) {

    return (

        <div className='list-item'>

            <div className="check-container">
                <div className="circular-check"></div>
            </div>

            <p>{props.text}</p>
            
        </div>

    );
}

export default MyPublishedListItem;