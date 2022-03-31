import React from 'react';
import './MyPublishedLists.css';
import MyPublishedList from './MyPublishedList/MyPublishedList';

function MyPublishedLists() {
    return (
        <div className='mypublishedlists-content'>
            <h1 className='mypublishedlists-title'>My Published Lists</h1>
            < MyPublishedList title='List Title 1'/>
            < MyPublishedList title='List Title 2'/>
        </div>
    );
}

export default MyPublishedLists;