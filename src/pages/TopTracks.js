import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import Song from '../Components/Song/Song';
import './TopTracks.css';

const accessToken = localStorage.getItem('accessToken');
const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/';
const longTermConfig = {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    params: {
        limit: 10,
        time_range: 'short_term'
    },
};

const mediumTermConfg = {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    params: {
        limit: 10,
        time_range: 'medium_term'
    },
};

const longTermConfg = {
    headers: {
        Authorization: 'Bearer ' + accessToken
    },
    params: {
        limit: 10,
        time_range: 'long_term'
    },
};

function TopTracks() {
    let navigate = useNavigate();
    const [trackData, setTrackData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const getUserData = () => {
        const shortTerm = axios.get(SPOTIFY_ENDPOINT + 'tracks', longTermConfig);
        const mediumTerm = axios.get(SPOTIFY_ENDPOINT + 'tracks', mediumTermConfg);
        const allTime = axios.get(SPOTIFY_ENDPOINT + 'tracks', longTermConfg);
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
                navigate('/');
            })
    }
    useEffect(getUserData, [navigate]);
    return (
        <>
            {isLoading
                ? <div>Data is still loading</div>
                :
                <>
                    <NavBar backgroundColor={'khaki'} />
                    <div className='flexContainer' style={{ backgroundColor: 'khaki' }}>
                        <div className='flexChild trackContent flexContainerCentered'>
                            <h1>All Time</h1>
                        </div>
                        <div className='flexChild flexContainerCentered'>
                            <div className='songsContainer'>
                                {trackData.longTerm.map((item, i) => <Song cover={item.album.images[2].url} index={i + 1} name={item.name} artist={item.artists[0].name} />)}
                            </div>
                        </div>
                    </ div>

                    <div className='flexContainer' style={{ backgroundColor: 'yellowgreen' }}>
                        <div className='flexChild flexContainerCentered'>
                            <div className='songsContainer'>
                                {trackData.mediumTerm.map((item, i) => <Song cover={item.album.images[2].url} index={i + 1} name={item.name} artist={item.artists[0].name} />)}
                            </div>
                        </div>
                        <div className='flexChild trackContent flexContainerCentered'>
                            <h1>Medium Term</h1>
                        </div>
                    </ div>
                    <div className='flexContainer' style={{ backgroundColor: 'cadetblue' }}>
                        <div className='flexChild trackContent flexContainerCentered'>
                            <h1>Long Term</h1>
                        </div>
                        <div className='flexChild flexContainerCentered'>
                            <div className='songsContainer'>
                                {trackData.longTerm.map((item, i) => <Song cover={item.album.images[2].url} index={i + 1} name={item.name} artist={item.artists[0].name} />)}
                            </div>
                        </div>
                    </ div>
                </>
            }
        </>
    );
}

export default TopTracks;