import { React } from 'react';
import { IoIosArrowDown as Arrow } from 'react-icons/io';
import './LoginHero.css';
import Ball from '../Ball/Ball';
import smoothscroll from 'smoothscroll-polyfill';
import { motion } from 'framer-motion';

function LoginHero() {
    smoothscroll.polyfill();
    return (
        <>
            <div className='ballWrapper'>
                <Ball size={'5vw'} top={'4vh'} left={'25vw'} color={'#34D564'} offset={'700px'} depth={'front'} />
                <Ball size={'25vw'} top={'70vh'} left={'5vw'} color={'#1DB954'} offset={'-600px'} depth={'back'} />
                <Ball size={'60vw'} top={'20vh'} left={'80vw'} color={'#28c25e'} offset={'0px'} depth={'back'} />
            </div>
            <div className="heroWrapper">
                <div className="headerWrapper">
                    <h1 className="header">
                        Analyse Your Spotify<span style={{ color: "green", margin: "0" }}>.</span>
                    </h1>
                </div>
                <motion.div className='arrowPosition'
                    animate={{ y: [50, 0] }}
                    transition={{ repeat: Infinity, repeatType: 'reverse' }}>
                    <Arrow className="arrow" onClick={() => {
                        window.scroll({
                            top: document.body.scrollHeight,
                            behavior: 'smooth'
                        });
                    }} />
                </motion.div>
            </div >
        </>
    );
}

export default LoginHero