import { React } from 'react';
import { IoIosArrowDown as Arrow } from 'react-icons/io';
import './LoginHero.css';
import Ball from '../Ball/Ball';
import smoothscroll from 'smoothscroll-polyfill';
import { motion } from 'framer-motion';

function LoginHero() {
    smoothscroll.polyfill();
    return (
        <div className="heroWrapper">
            <Ball size={'5vw'} top={'4vh'} left={'25vw'} color={'#34D564'} offset={2000} depth={'front'} />
            <Ball size={'25vw'} top={'70vh'} left={'5vw'} color={'#1DB954'} offset={-400} depth={'back'} />
            <Ball size={'60vw'} top={'20vh'} left={'80vw'} color={'#28c25e'} offset={300} depth={'back'} />
            <div className="headerWrapper">
                <h1 className="header">
                    Analyse Your Spotify<span style={{ color: "green", margin: "0" }}>.</span>
                </h1>
            </div>
            <motion.div className='arrowPosition'
                animate={{ y: [50, 0]}}
                transition={{ yoyo: Infinity}}>
                <Arrow className="arrow" onClick={() => {
                    window.scroll({
                        top: 200,
                        behavior: 'smooth'
                    });
                }} />
            </motion.div>
        </div >
    );
}

export default LoginHero