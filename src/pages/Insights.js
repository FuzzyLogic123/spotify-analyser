import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DisplayInfo from '../Components/DisplayInfo/DisplayInfo.js'
import DisplayInfoRight from '../Components/DisplayInfo/DisplayInfoRight.js'
import NavBar from '../Components/NavBar/NavBar.js';
import './Insights.css'
import axios from 'axios';
import { mostObscureArtist, mostPopularArtist, getObscurityRating } from '../dataProcessFunctions.js';

const accessToken = localStorage.getItem('accessToken');
const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/'
const config = {
    headers: {
        Authorization: 'Bearer ' + accessToken,
    },
};

function Insights() {
    let navigate = useNavigate();
    const [popArtist, setPopArtist] = useState({});
    const [obscureArtist, setObscureArtist] = useState({});
    const [obscurityRating, setObscurityRating] = useState(0);
    const [artistData, setArtistData] = useState({});
    const [trackData, setTrackData] = useState({});
    const [artistsLoading, setArtistLoading] = useState(true);
    const [tracksLoading, setTracksLoading] = useState(true);
    const getUserData = () => {
        axios.get(SPOTIFY_ENDPOINT + 'artists', config)
        .then((artistData) => {
            setArtistData(artistData.data.items);
            setPopArtist(mostPopularArtist(artistData));
            setObscureArtist(mostObscureArtist(artistData));
            setObscurityRating(getObscurityRating(artistData));
            setArtistLoading(false);
        })
        .catch((error) => {
            console.log(error);
            navigate('/');
        })
        axios.get(SPOTIFY_ENDPOINT + 'tracks', config)
        .then((trackData) => {
            setTrackData(trackData.data.items);
            setTracksLoading(false);
        })
        .catch((error) => {
            console.log(error);
            navigate('/');
        })
    }
    useEffect(getUserData, [navigate]);

    return (
        <>
        {tracksLoading || artistsLoading
           ? <div>Data is still loading</div>
            :<>
            <NavBar backgroundColor={'#FBE7C6'} textColor={'white'}/>
            <DisplayInfo backgroundColor={'#FBE7C6'} image={artistData[0].images[0].url}>
                <h1 className="prompt">Your top Artist is</h1>
                <h1 className='result'>{artistData[0].name}</h1>
            </DisplayInfo>

            <DisplayInfoRight backgroundColor={'#B4F8C8'} image={trackData[0].album.images[0].url}>
                <h1 className="prompt">Your top Track is</h1>
                <h1 className='result'>{`${trackData[0].name} by ${trackData[0].artists[0].name}`}</h1>
            </DisplayInfoRight>

            <DisplayInfo backgroundColor={'#A0E7E5'} image={popArtist.url}>
                <h1 className="prompt">The most mainstream Artist in your top 20 is</h1>
                <h1 className='result'>{popArtist.name}</h1>
            </DisplayInfo>

            <DisplayInfoRight backgroundColor={'#FFAEBC'} image={obscureArtist.url}>
                <h1 className="prompt">The most obscure Artist in your top 20 is</h1>
                <h1 className='result'>{obscureArtist.name}</h1>
            </DisplayInfoRight>

            <div style={{backgroundColor: 'black', position: 'relative'}}>
                <div style={{display: 'inline-block'}}>
                <h1 className='obscurePrompt prompt'>Your Obsurity Rating is*</h1>
                </div>
                <div style={{display: 'inline-block'}}>
                <h1 className='obscureResult result'>
                    {`${(100- obscurityRating).toFixed(2)}%`}
                    </h1>
                    <h4 className='obscureResult asterisk'>*based on the popularity of your top 20 artists <br/> Higher is more obscure</h4>
                </div>
            </div>
            </>}
        </> 
        );
}

export default Insights;