import React from "react";
import './Home.css';
import Navbar from "../../UI Components/Navbar/Navbar";
import ActionBar from "../../UI Components/ActionBar/ActionBar";

function Home(){
    return(
        <div className="main-home-div">
            <Navbar>Ishan Vyas</Navbar>
            <div className="home-div">

                <div className="info-div"></div>

                <ActionBar style={{width:'15%', height: '50vh'}} />
            </div>
        </div>
    );
}

export default Home;