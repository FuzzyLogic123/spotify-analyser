import React from 'react';
import { useNavigate } from 'react-router';
import './PageNotFound.css';
import { motion } from 'framer-motion'

function PageNotFound() {
    let navigate = useNavigate();
    return (
        <div className='notFoundBackground'>
            <div className='absoluteCentered'>
                <h1 style={{textAlign: 'center', color: 'white'}}>Page not Found :(</h1>
                <br/>
                <motion.button whileHover={{scale: 1.1}} whileTap={{ scale: 0.95 }} className='menuRedirectButton' onClick= { ()=> navigate('/')}>Menu</motion.button>
            </div>
        </div>
    );
}

export default PageNotFound;