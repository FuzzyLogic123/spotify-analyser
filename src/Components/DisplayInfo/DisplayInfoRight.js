import React from 'react';
import FadeInOnScroll from '../FadeInOnScroll';
import './DisplayInfo.css';

function DisplayInfoRight({ children, backgroundColor, image }) {
    return (
        <div className='flexContainer segment' style={{ backgroundColor }}>
            <div className='flexChild flexContainerCentered'>
                <FadeInOnScroll>
                    <img className='image' src={image} alt="Ed Sheeran"></img>
                </ FadeInOnScroll>
            </div>
            <div className='flexChild flexContainerCentered'>
                <div className='centered'>
                    <FadeInOnScroll>
                        {children}
                    </ FadeInOnScroll>
                </div>
            </div>
        </div>
    );
}

export default DisplayInfoRight;