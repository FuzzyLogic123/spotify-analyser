import React from 'react';
import './DisplayInfo.css';

function DisplayInfoRight( { children, backgroundColor, image}) {
    return ( 
        <div style={{ backgroundColor}}>
        <div className='imageWrapper'>
            <img src={ image } alt="Ed Sheeran"></img>
        </div>
        <div className='content'>
            { children }
        </div>
    </div>
     );
}

export default DisplayInfoRight;