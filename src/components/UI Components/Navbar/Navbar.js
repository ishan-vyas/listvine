import React from "react";
import './Navbar.css';
import { PermIdentity } from '@material-ui/icons';
import { useAuth } from "../../../context/UserAuthContext";

function Navbar(props){

    const { user } = useAuth();

    return(
        <div className="main-navbar">
            <h2 id="navbar-logo">listvine</h2>
            <PermIdentity fontSize="large" style={{color: 'white'}} />
            <p id="navbar-user">{user.displayName}</p>
        </div>
    );
}

export default Navbar;