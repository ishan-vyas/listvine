import React from "react";
import './ActionBar.css';
import { Link } from "react-router-dom";
import { HomeOutlined, ListAltOutlined, CreateOutlined, CardGiftcardOutlined, ExitToAppOutlined } from '@material-ui/icons';

function ActionBar(props){
    return(
        <div className="actionbar-div" style={props.style}>
            <div className="home-action">
                <Link to="/home">
                    <HomeOutlined fontSize="large"/>
                </Link>
                <Link to="/home">
                    <p>Home</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="newsfeed-action">
                <Link to="/newsfeed">
                    <ListAltOutlined fontSize="large"/>
                </Link>
                <Link to="/newsfeed">
                    <p>Newsfeed</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="newlist-action">
                <Link to="/newlist">
                    <CreateOutlined fontSize="large"/>
                </Link>
                <Link to="/newlist">
                    <p>New List</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="invitations-action">
                <Link to="/invitations">
                    <CardGiftcardOutlined fontSize="large"/>
                </Link>
                <Link to="/invitations">
                    <p>Invitations</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="logout-action">
                <Link to='/login'>
                    <ExitToAppOutlined fontSize="large"/>
                </Link>
                <Link to="/login">
                    <p>Log Out</p>
                </Link>
            </div>
        </div>
    );
}

export default ActionBar;