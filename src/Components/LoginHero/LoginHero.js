import React from 'react';
import { IoIosArrowDown as Arrow } from 'react-icons/io'

function LoginHero() {
    return ( 
        <div className="heroWrapper">
        <div className="background-circle-small"></div>
        <div className="background-circle-medium"></div>
        <div className="background-circle-large"></div>
        <div className="headerWrapper">
            <h1 className="header">
            Analyse Your Spotify<span style = {{ color: "green", margin: "0"}}>.</span>
            </h1> 
        </div>
            <Arrow className="arrow"/>
        </div> 
    );
}

export default LoginHero