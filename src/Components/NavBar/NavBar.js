import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';
import FadeInOnScroll from '../FadeInOnScroll';

function NavBar({ backgroundColor, textColor }) {
    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }} className="navBar">
            <FadeInOnScroll>
                <Link className='link' to="/menu">Menu</Link>
            </FadeInOnScroll>
            <FadeInOnScroll>
                <Link className='link' to="" onClick={() => {
                    window.location = "http://accounts.spotify.com/";
                    localStorage.clear();
                }}>Sign Out 👋</Link>
            </FadeInOnScroll>
        </div>
    );
}

export default NavBar;