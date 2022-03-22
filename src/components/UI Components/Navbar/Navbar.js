import React from "react";
import './Navbar.css';
import { PermIdentity, NotificationsNone } from '@material-ui/icons';

function Navbar(props){
    return(
        <div className="main-navbar">
            <h2 id="navbar-logo">listvine</h2>
            <NotificationsNone fontSize="large" style={{color: 'white'}}/>
            <PermIdentity fontSize="large" style={{color: 'white'}} />
            <p id="navbar-user">{props.children}</p>
        </div>
    );
}

export default Navbar;