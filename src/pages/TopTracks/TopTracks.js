import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import Song from '../../Components/Song/Song';
import './TopTracks.css';
import FadeInOnScroll from '../../Components/FadeInOnScroll.js'
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';
import Loader from '../../Components/Loader/Loader.js';

function TopTracks() {
    let navigate = useNavigate();
    const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/';
    const [trackData, setTrackData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const shortTermConfig = {
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            params: {
                limit: 10,
                time_range: 'short_term'
            },
        };

        const mediumTermConfig = {
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            params: {
                limit: 10,
                time_range: 'medium_term'
            },
        };

        const longTermConfig = {
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            params: {
                limit: 10,
                time_range: 'long_term'
            },
        };
        const getUserData = (longTermConfig, mediumTermConfig, shortTermConfig) => {
            const shortTerm = axios.get(SPOTIFY_ENDPOINT + 'tracks', shortTermConfig);
            const mediumTerm = axios.get(SPOTIFY_ENDPOINT + 'tracks', mediumTermConfig);
            const allTime = axios.get(SPOTIFY_ENDPOINT + 'tracks', longTermConfig);
            axios.all([shortTerm, mediumTerm, allTime]).then(axios.spread((...responses) => {
                const shortTermData = responses[0].data.items;
                const mediumTermData = responses[1].data.items;
                const longTermData = responses[2].data.items;
                setTrackData({
                    shortTerm: shortTermData,
                    mediumTerm: mediumTermData,
                    longTerm: longTermData
                });
                setIsLoading(false);
            }))
                .catch((error) => {
                    console.log(error);
                    navigate('/login');
                })
        }
        getUserData(longTermConfig, mediumTermConfig, shortTermConfig);
    }, [navigate]);
    return (
        <>
            {isLoading
                ? <Loader />
                :
                <>
                    <MusicPlayer trackData={trackData.longTerm} />
                    <NavBar backgroundColor={'khaki'} />
                    <div className='flexContainer' style={{ backgroundColor: 'khaki' }}>
                        <div className='flexChild trackContent flexContainerCentered'>
                            <FadeInOnScroll>
                                <h1>All Time</h1>
                            </FadeInOnScroll>
                        </div>
                        <div className='flexChild flexContainerCentered'>
                            <div className='songsContainer'>
                                {trackData.longTerm.map((item, i) => <Song key={item.name} cover={item.album.images[2].url} index={i + 1} name={item.name} artist={item.artists[0].name} />)}
                            </div>
                        </div>
                    </ div>

                    <div className='flexContainer' style={{ backgroundColor: 'yellowgreen' }}>
                        <div className='flexChild flexContainerCentered'>
                            <div className='songsContainer'>
                                {trackData.mediumTerm.map((item, i) => <Song key={item.name} cover={item.album.images[2].url} index={i + 1} name={item.name} artist={item.artists[0].name} />)}
                            </div>
                        </div>
                        <div className='flexChild trackContent flexContainerCentered'>
                            <FadeInOnScroll>
                                <h1>Medium Term</h1>
                            </FadeInOnScroll>
                        </div>
                    </ div>
                    <div className='flexContainer' style={{ backgroundColor: 'cadetblue' }}>
                        <div className='flexChild trackContent flexContainerCentered'>
                            <FadeInOnScroll>
                                <h1>Short Term</h1>
                            </FadeInOnScroll>
                        </div>
                        <div className='flexChild flexContainerCentered'>
                            <div className='songsContainer'>
                                {trackData.shortTerm.map((item, i) => <Song key={item.name} cover={item.album.images[2].url} index={i + 1} name={item.name} artist={item.artists[0].name} />)}
                            </div>
                        </div>
                    </ div>
                </>
            }
        </>
    );
}

export default TopTracks;