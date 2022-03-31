import React from "react";
import './Home.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";
import { useAuth } from "../../../context/UserAuthContext";
import MyLists from "../../UI Components/MyLists/MyLists";
import MyPublishedLists from "../../UI Components/MyPublishedLists/MyPublishedLists";

function Home(){

    const {user} = useAuth();

    return(
        <div className="main-home-div">
            <Navbar />
            <div className="home-div">

                <div className="info-div">

                    <div className="info-div-child">
                        < MyLists />
                    </div>
                    <div className="info-div-child">
                        < MyPublishedLists />
                    </div>
                    
                </div>

                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default Home;