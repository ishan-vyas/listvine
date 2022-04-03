import {React, useState} from 'react';
import './MyPublishedList.css';
import MyPublishedListItem from './MyPublishedListItem/MyPublishedListItem';

function MyPublishedList(props) {

    const [listOpen, setListOpen] = useState(false);

    return (
        <div className="mypublishedlist" onClick={() => setListOpen(!listOpen)}>
            <div className='mypublishedlist-title'>
                {props.title}
            </div>

            {listOpen && (<>
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
            </>)}
        </div>
    );
}

export default MyPublishedList;