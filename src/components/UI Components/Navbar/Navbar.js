import React, { useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { PermIdentity, Menu, MenuOpen, CreateOutlined } from '@material-ui/icons';
import { useAuth } from "../../../context/UserAuthContext";
import ActionBar from "../ActionBar/ActionBar";

function Navbar(props){

    const { user } = useAuth();
    const [menu, setMenu] = useState(false);

    return(
        <>
            <div className="main-navbar">
                <h2 id="navbar-logo">listvine</h2>
                <PermIdentity fontSize="large" style={{color: 'white'}} />
                <div className="navbar-menu">
                    {menu ? (<MenuOpen onClick={() => setMenu(false)} fontSize="large" style={{color: 'white'}} />) : (<Menu onClick={() => setMenu(true)} fontSize="large" style={{color: 'white'}}/>)}
                </div>
                <p id="navbar-user">{user.displayName}</p>
            </div>
            {menu && (
            <div className="navbar-action-background">
                <div className="navbar-action-menu">
                    <ActionBar closeMenu={true} closeActionBar={() => setMenu(false)}style={{height:'100vh'}}/>
                </div>
            </div> 
            )}
            {!props.showCreate && 
                <div className="create-div-shortcut">
                    <Link to="/newlist" style={{textDecoration:'none', color:'black'}}>
                        <CreateOutlined style={{color:"white", top:"100%"}} fontSize="large"/>
                    </Link>
                </div>
            }
        </>
    );
}

export default Navbar;