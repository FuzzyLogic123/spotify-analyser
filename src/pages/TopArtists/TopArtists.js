import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import DisplayInfo from '../../Components/DisplayInfo/DisplayInfo.js';
import DisplayInfoRight from '../../Components/DisplayInfo/DisplayInfoRight.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import './TopArtists.css'
import FadeInOnScroll from '../../Components/FadeInOnScroll.js';
import Loader from '../../Components/Loader/Loader.js';

const accessToken = localStorage.getItem('accessToken');
const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/';
const longTermConfig = {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    params: {
        limit: 5,
        time_range: 'short_term'
    },
};

const mediumTermConfg = {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    params: {
        limit: 5,
        time_range: 'medium_term'
    },
};

const longTermConfg = {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    params: {
        limit: 5,
        time_range: 'long_term'
    },
};

function TopArtists() {
    let navigate = useNavigate();
    const [artistData, setArtistData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const getUserData = () => {
        const shortTerm = axios.get(SPOTIFY_ENDPOINT + 'artists', longTermConfig);
        const mediumTerm = axios.get(SPOTIFY_ENDPOINT + 'artists', mediumTermConfg);
        const allTime = axios.get(SPOTIFY_ENDPOINT + 'artists', longTermConfg);
        axios.all([shortTerm, mediumTerm, allTime]).then(axios.spread((...responses) => {
            const shortTermData = responses[0].data.items;
            const mediumTermData = responses[1].data.items;
            const longTermData = responses[2].data.items;
            console.log(shortTermData);
            console.log(mediumTermData);
            console.log(longTermData);
            setArtistData({
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
    useEffect(getUserData, [navigate]);
    return (
        <>
            {isLoading
                ? <Loader />
                :
                <>
                    <NavBar backgroundColor={'brown'} />
                    <DisplayInfo backgroundColor={'brown'} image={artistData.mediumTerm[0].images[0].url}>
                        <h1 className='result'>#1 <br />{artistData.mediumTerm[0].name}</h1>
                    </ DisplayInfo>
                    <div className='flexContainer' style={{ backgroundColor: 'salmon' }}>
                        <div className='flexChildSmall segment flexContainerCentered'>
                            {/* <img className='image' src={artistData.mediumTerm[1].images[0].url} alt="second top artist"></img> */}
                            <FadeInOnScroll>
                                <img className='image' src={artistData.mediumTerm[2].images[0].url} alt="third top artist"></img>
                            </FadeInOnScroll>
                        </div>
                        <div className='flexChild mediumText artistListed'>
                            {artistData.mediumTerm.slice(1).map((artist, i) => (
                                <FadeInOnScroll key={artist.name}>
                                    <div>
                                        <div className='artistIndex'>#{i + 2}</div> {artist.name}
                                    </div>
                                </FadeInOnScroll>
                            ))}
                        </div>
                    </ div>
                    <DisplayInfoRight image={artistData.longTerm[0].images[0].url} backgroundColor={'skyblue'}>
                        <div className='result'>{artistData.longTerm[0].name}</div> <div className='prompt'>is an all time favourite</div>
                    </ DisplayInfoRight>
                    <DisplayInfo image={artistData.shortTerm[0].images[0].url} backgroundColor={'cornflowerblue'}>
                        <div className='result'><div className='prompt'>But recently you've been enjoying</div>{artistData.shortTerm[0].name}</div>
                    </ DisplayInfo>
                </>
            }
        </>
    );
}

export default TopArtists;