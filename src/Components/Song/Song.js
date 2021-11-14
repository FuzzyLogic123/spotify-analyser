import React from 'react';
import './Song.css';

function Song( { index, name, artist, cover }) {
    return ( 
        <div style={{textAlign:'center'}}>
        <div className='songContainer'>
            <h2 className='index'>{index}</h2>
            <img className={'albumCover'} src={cover} alt='albumCover'></img>
            <div className='infoWrapper'>
                <h1 className='songName'>{name}</h1>
                <br/>
                <h2 className='artistName'>{artist}</h2>
            </div>
            <div></div>
        </div>
        </div>
     );
}

export default Song;