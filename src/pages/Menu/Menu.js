import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './Menu.css'
import { motion } from 'framer-motion';
import edSheeran from '../../images/edSheeran.jpg';
import arianaGrande from '../../images/arianaGrande.jpg';


const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});
    return paramsSplitUp
};

function Menu() {
    let navigate = useNavigate();
    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
            //remove hash in url
            navigate("/", { replace: true });
            localStorage.clear();
            const currentTime = new Date().getTime();
            const expire_time = new Date(currentTime + Number(expires_in) * 1000);
            console.log(expire_time.toLocaleTimeString())
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresAt", expire_time);
        }
        if (!localStorage.getItem("accessToken") || new Date() > new Date(localStorage.getItem('expiresAt'))) {
            navigate('/login');
        }
    });
    return (
        <>
            <motion.img
                animate={{ y: 30 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3, mass: 10, damping: 500 }}
                className='floatingImage1 floatingImage'
                src={edSheeran} alt='Ed Sheeran'>

            </motion.img>
            <motion.img
                animate={{ y: -25 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2, mass: 10, damping: 500 }}
                className='floatingImage2 floatingImage'
                src={arianaGrande}
                alt='Ed Sheeran'>

            </motion.img>
            <div className="menuWrapper">
                <div className="menuItems">
                    <motion.div className='menuItem' whileHover={{ x: '5rem', textDecoration: 'underline' }}>
                        <Link className='menuLink' to="/insights">INSIGHTS</Link>
                    </motion.div>
                    <motion.div className='menuItem' whileHover={{ x: '5rem', textDecoration: 'underline' }}>
                        <Link className='menuLink' to="/topTracks">TOP TRACKS</Link>
                    </motion.div>
                    <motion.div className='menuItem' whileHover={{ x: '5rem', textDecoration: 'underline' }}>
                        <Link className='menuLink' to="/topArtists">TOP ARTISTS</Link>
                    </motion.div>
                    <motion.div className='menuItem' whileHover={{ x: '5rem', textDecoration: 'underline' }}>
                        <Link className='menuLink' to="" onClick={() => {
                            window.location = "http://accounts.spotify.com/";
                            localStorage.clear();
                        }}>LOGOUT</Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default Menu;