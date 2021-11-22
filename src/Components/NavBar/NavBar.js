import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

function NavBar({ backgroundColor, textColor }) {
    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }} className="navBar">
            <Link className='link' to="/">Menu</Link>
            <Link className='link' to="" onClick={() => {
                window.location = "http://accounts.spotify.com/";
                localStorage.clear();
            }}>Sign Out 👋</Link>
        </div>
    );
}

export default NavBar;