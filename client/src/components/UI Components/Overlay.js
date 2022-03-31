import React from "react";
import './Overlay.css';

function Overlay(){
    return(
        <div className="overlay">
            <div className="image-overlay">
                <img alt="overlay-image" src="/images/listImage.jpg"/>
            </div>
            <div className="color-overlay"></div>
        </div>
    );
}

export default Overlay;