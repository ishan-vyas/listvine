import React from 'react';
import './MyList.css';
import MyListItem from './MyListItem/MyListItem';
import MyAddListItem from './MyListItem/MyAddListItem';

function MyList(props) {
    return (
        <div className="mylist">
            <div className='mylist-title'>
                {props.title}
            </div>

            <div className='mylist-actions'>
                <div className='mylist-btn blue'>Members</div>
                <div className='mylist-btn blue'>Invitations</div>
                <div className='mylist-btn blue'>Publish</div>
                <div className='mylist-btn red'>Delete</div>
            </div>

            <div>
                < MyListItem text="SENG300 assignment"/>
                < MyListItem text="apples"/>
                < MyAddListItem text="Add new list item..." />
            </div>
        </div>
    );
}

export default MyList;