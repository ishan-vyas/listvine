import React from "react";
import './ActionBar.css';
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined, ListAltOutlined, CreateOutlined, CardGiftcardOutlined, SettingsOutlined, ExitToAppOutlined } from '@material-ui/icons';
import { useAuth } from "../../../context/UserAuthContext";

function ActionBar(props){

    const { logOut } = useAuth();
    const navigate = useNavigate();

    const logOutHandler = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

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
            <div className="logout-action" onClick={logOutHandler}>
                <ExitToAppOutlined fontSize="large"/>
                <p className="actionbar-p">Log Out</p>
            </div>
        </div>
    );
}

export default ActionBar;