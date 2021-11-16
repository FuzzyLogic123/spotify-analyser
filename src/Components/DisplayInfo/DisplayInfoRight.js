import React from 'react';
import './DisplayInfo.css';

function DisplayInfoRight({ children, backgroundColor, image }) {
    return (
        <div className='flexContainer segment' style={{ backgroundColor }}>
            <div className='flexChild flexContainerCentered'>
                <img className='image' src={image} alt="Ed Sheeran"></img>
            </div>
            <div className='flexChild flexContainerCentered'>
                <div className='centered'>{children}</div>
            </div>
        </div>
    );
}

export default DisplayInfoRight;