import React from "react";
import './ActionBar.css';
import { Link } from "react-router-dom";
import { HomeOutlined, ListAltOutlined, CreateOutlined, CardGiftcardOutlined, SettingsOutlined, ExitToAppOutlined } from '@material-ui/icons';

function ActionBar(props){
    return(
        <div className="actionbar-div" style={props.style}>
            <div className="home-action">
                <Link to="/home">
                    <HomeOutlined fontSize="large"/>
                </Link>
                <Link to="/home">
                    <p className="actionbar-p">Home</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="newsfeed-action">
                <Link to="/newsfeed">
                    <ListAltOutlined fontSize="large"/>
                </Link>
                <Link to="/newsfeed">
                    <p className="actionbar-p">Newsfeed</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="newlist-action">
                <Link to="/newlist">
                    <CreateOutlined fontSize="large"/>
                </Link>
                <Link to="/newlist">
                    <p className="actionbar-p">New List</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="invitations-action">
                <Link to="/invitations">
                    <CardGiftcardOutlined fontSize="large"/>
                </Link>
                <Link to="/invitations">
                    <p className="actionbar-p">Invitations</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="invitations-action">
                <Link to="/settings">
                    <SettingsOutlined fontSize="large"/>
                </Link>
                <Link to="/settings">
                    <p className="actionbar-p">Settings</p>
                </Link>
            </div>
            <div className="seperator"></div>
            <div className="logout-action">
                <Link to='/login'>
                    <ExitToAppOutlined fontSize="large"/>
                </Link>
                <Link to="/login">
                    <p className="actionbar-p">Log Out</p>
                </Link>
            </div>
        </div>
    );
}

export default ActionBar;