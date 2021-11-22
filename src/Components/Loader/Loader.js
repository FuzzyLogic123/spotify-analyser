import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Loader.css'

function Loader() {
    const loadingPhrases = ['lubricating catapult', 'fetching data', 'insulting political opponent']
    const [phraseIndex, setPhraseIndex] = useState(Math.floor(Math.random() * (loadingPhrases.length)));
    useEffect(()=> {
        const timeoutHandle = setTimeout(() => {
            if (phraseIndex === loadingPhrases.length - 1) {
                setPhraseIndex(0);
            } else
                setPhraseIndex(phraseIndex + 1);
        }, 3000)
        return ()=> clearTimeout(timeoutHandle);
    });

    return (
        <div
            className='loaderBackground'>
            <div
                className='absoluteCentered'>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ type: 'tween', repeat: Infinity, ease: 'linear', duration: 0.8 }}
                >

                    <div style={{ borderTopColor: '#3498db', height: '10rem', width: '10rem' }}
                        className='loader absoluteCentered'></div>
                </motion.div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ type: 'tween', repeat: Infinity, ease: 'linear', duration: 1 }}
                >
                    <div style={{ borderTopColor: 'yellow', height: '8rem', width: '8rem' }}
                        className='loader absoluteCentered'></div>
                </motion.div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ type: 'tween', repeat: Infinity, ease: 'linear', duration: 3 }}
                >
                    <div style={{ borderTopColor: 'orange', height: '6rem', width: '6rem' }}
                        className='loader absoluteCentered'></div>
                </motion.div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ type: 'tween', repeat: Infinity, ease: 'linear', duration: 2 }}
                >
                    <div style={{ borderTopColor: 'limegreen', height: '4rem', width: '4rem' }}
                        className='loader absoluteCentered'></div>
                </motion.div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ type: 'tween', repeat: Infinity, ease: 'linear', duration: 3 }}
                >
                    <div style={{ borderTopColor: 'pink', height: '2rem', width: '2rem' }}
                        className='loader absoluteCentered'></div>
                </motion.div>
                <p
                    className='loaderText'>{loadingPhrases[phraseIndex] + '...'}</p>
            </div>
        </div>
    );
}

export default Loader;