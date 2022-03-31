import React from 'react';
import './MyPublishedList.css';
import MyPublishedListItem from './MyPublishedListItem/MyPublishedListItem';

function MyPublishedList(props) {
    return (
        <div className="mypublishedlist">
            <div className='mypublishedlist-title'>
                {props.title}
            </div>

            <div>
                < MyPublishedListItem text="SENG300 assignment"/>
                < MyPublishedListItem text="apples"/>
            </div>
            <div className="break"></div>
            <div className='mypublishedlist-seperator'></div>
            <div className="break"></div>

            <div className="mypublishedlist-comment-section">
                <p>3 likes</p>
                <p><u>2 comments</u></p>
            </div>
        </div>
    );
}

export default MyPublishedList;