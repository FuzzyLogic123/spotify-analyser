import React from 'react';
import './DisplayInfo.css';
import FadeInOnScroll from '../FadeInOnScroll';

function DisplayInfo({ children, backgroundColor, image }) {
    return (
        <div className='flexContainer segment' style={{ backgroundColor }}>
            <div className='flexChild flexContainerCentered'>
                <FadeInOnScroll>
                    {children}
                </ FadeInOnScroll>
            </div>
            <div className='flexChild flexContainerCentered'>
                <FadeInOnScroll>
                    <img className='image' src={image} alt="Ed Sheeran"></img>
                </ FadeInOnScroll>
            </div>
        </div>
    );
} 

export default DisplayInfo;