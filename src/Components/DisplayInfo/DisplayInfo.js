import React from 'react';
import './DisplayInfo.css';

function DisplayInfo({ children, backgroundColor, image }) {
    return (
        <div className='flexContainer segment' style={{ backgroundColor }}>
            <div className='flexChild flexContainerCentered'>
                <div>
                    {children}
                </div>
            </div>
            <div className='flexChild flexContainerCentered'>
                <img className='image' src={image} alt="Ed Sheeran"></img>
            </div>
        </div>
    );
}

export default DisplayInfo;