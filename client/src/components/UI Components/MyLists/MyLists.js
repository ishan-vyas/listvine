import React from 'react';
import './MyLists.css';
import MyList from './MyList/MyList';

function MyLists() {
    return (
        <div className='mylists-content'>
            <h1 className='mylists-title'>My Lists</h1>
            < MyList title='List Title 1'/>
            < MyList title='List Title 2'/>
        </div>
    );
}

export default MyLists;