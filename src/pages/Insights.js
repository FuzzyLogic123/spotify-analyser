import { React, useState, useEffect } from 'react';
import DisplayInfo from '../Components/DisplayInfo/DisplayInfo.js'
import DisplayInfoRight from '../Components/DisplayInfo/DisplayInfoRight.js'
import './Insights.css'
import oceanEyes from '../images/oceanEyes.png';
import duaLipa from '../images/duaLipa.jpg';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const SPOTIFY_ENDPOINT = 'https://api.spotify.com/v1/me/top/'
const config = {
    headers: {
        Authorization: 'Bearer ' + accessToken,
    },
};

function Insights() {
    const [artistData, setArtistData] = useState({});
    const [trackData, setTrackData] = useState({});
    const [artistsLoading, setArtistLoading] = useState(true);
    const [tracksLoading, setTracksLoading] = useState(true);
    const getUserData = () => {
        axios.get(SPOTIFY_ENDPOINT + 'artists', config)
        .then((artistData) => {
            setArtistData(artistData.data.items);
            setArtistLoading(false);
            console.log(artistData);
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get(SPOTIFY_ENDPOINT + 'tracks', config)
        .then((trackData) => {
            setTrackData(trackData.data.items);
            setTracksLoading(false);
            console.log(trackData);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
        {tracksLoading || artistsLoading
           ? <div>Data is still loading</div>
            :<><DisplayInfo backgroundColor={'orange'} image={artistData[0].images[0].url}>
                <h1 className="prompt">Your all time top Artist is</h1>
                <h1 className='result'>{artistData[0].name}</h1>
            </DisplayInfo>

            <DisplayInfoRight backgroundColor={'cadetblue'} image={trackData[0].album.images[0].url}>
                <h1 className="prompt">Your top Track is</h1>
                <h1 className='result'>{`${trackData[0].name} by ${trackData[0].artists[0].name}`}</h1>
            </DisplayInfoRight>

            <DisplayInfo backgroundColor={'thistle'} image={duaLipa}>
                <h1 className="prompt">The most mainstream Artist in your library is</h1>
                <h1 className='result'>Dua Lipa</h1>
            </DisplayInfo>

            <DisplayInfoRight backgroundColor={'cadetblue'} image={oceanEyes}>
                <h1 className="prompt">The most obscure Artist in your library is</h1>
                <h1 className='result'>Sycco</h1>
            </DisplayInfoRight>

            <div style={{backgroundColor: 'black', position: 'relative'}}>
                <div style={{display: 'inline-block'}}>
                <h1 className='obscurePrompt prompt'>Your Obsurity Rating is:</h1>
                </div>
                <div style={{display: 'inline-block'}}>
                <h1 className='obscureResult result'>20%</h1>
                </div>
            </div>
            </>}
        </> 
        );
}

export default Insights;