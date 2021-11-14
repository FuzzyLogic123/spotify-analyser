import React from 'react';
import './DisplayInfo.css';

function DisplayInfo({ children, backgroundColor, image }) {
    return (
        <div style={{ backgroundColor }}>
            <div className='content'>
                {children}
            </div>
            <div className='imageWrapper'>
                <img src={image} alt="Ed Sheeran"></img>
            </div>
        </div>
    );
}

export default DisplayInfo;