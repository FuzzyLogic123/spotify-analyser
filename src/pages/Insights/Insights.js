import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DisplayInfo from '../../Components/DisplayInfo/DisplayInfo.js'
import DisplayInfoRight from '../../Components/DisplayInfo/DisplayInfoRight.js'
import NavBar from '../../Components/NavBar/NavBar.js';
import FadeInOnScroll from '../../Components/FadeInOnScroll.js';
import './Insights.css'
import axios from 'axios';
import { mostObscureArtist, mostPopularArtist, getObscurityRating } from '../../Constants/dataProcessFunctions.js';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer.js';
import Loader from '../../Components/Loader/Loader.js'


function Insights() {
    let navigate = useNavigate();
    const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/';
    const [popArtist, setPopArtist] = useState({});
    const [obscureArtist, setObscureArtist] = useState({});
    const [obscurityRating, setObscurityRating] = useState(0);
    const [artistData, setArtistData] = useState({});
    const [trackData, setTrackData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const getUserData = (config) => {
        const artistsRequest = axios.get(SPOTIFY_ENDPOINT + 'artists', config);
        const tracksRequest = axios.get(SPOTIFY_ENDPOINT + 'tracks', config);

        axios.all([artistsRequest, tracksRequest]).then(axios.spread((...responses) => {
            const artistData = responses[0];
            const trackData = responses[1];
            setArtistData(artistData.data.items);
            setTrackData(trackData.data.items);
            setPopArtist(mostPopularArtist(artistData));
            setObscureArtist(mostObscureArtist(artistData));
            setObscurityRating(getObscurityRating(artistData));
            setIsLoading(false);
        })).catch(error => {
            // react on errors.
            console.log(error);
            navigate('/login');
        })
    }
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        };
        getUserData(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    return (
        <>
            {isLoading
                ? <Loader />
                : <>
                    <MusicPlayer trackData={trackData} />
                    <NavBar backgroundColor={'#FBE7C6'} textColor={'white'} />
                    <DisplayInfo backgroundColor={'#FBE7C6'} image={artistData[0].images[0].url}>
                        <h1 className="prompt">Top Artist</h1>
                        <h1 className='result'>{artistData[0].name}</h1>
                    </DisplayInfo>

                    <DisplayInfoRight backgroundColor={'#B4F8C8'} image={trackData[0].album.images[0].url}>
                        <h1 className="prompt">Top Track</h1>
                        <h1 className='result'>
                            {trackData[0].name}
                            <br />
                            {trackData[0].artists[0].name}
                        </h1>
                    </DisplayInfoRight>

                    <DisplayInfo backgroundColor={'#A0E7E5'} image={popArtist.url}>
                        <h1 className="prompt">Most mainstream Artist</h1>
                        <h1 className='result'>{popArtist.name}</h1>
                    </DisplayInfo>

                    <DisplayInfoRight backgroundColor={'#FFAEBC'} image={obscureArtist.url}>
                        <h1 className="prompt">Most obscure Artist</h1>
                        <h1 className='result'>{obscureArtist.name}</h1>
                    </DisplayInfoRight>

                    <div className="flexContainer" style={{ backgroundColor: 'black', position: 'relative', height: '50vh' }}>
                        <div className="flexChild flexContainerCentered">
                            <div>
                                <FadeInOnScroll>
                                    <h1 className='obscurePrompt prompt'>Obscurity Rating*</h1>
                                    <h4 className='obscureResult'>*based on the popularity of your top 20 artists. Higher is more obscure</h4>
                                </ FadeInOnScroll>
                            </div>
                        </div>
                        <div className="flexChild flexContainerCentered">
                            <FadeInOnScroll>
                                <h1 className='obscureResult result'>
                                    {`${(100 - obscurityRating).toFixed(2)}%`}
                                </h1>
                            </ FadeInOnScroll>
                        </div>
                    </div>
                </>}
        </>
    );
}

export default Insights;