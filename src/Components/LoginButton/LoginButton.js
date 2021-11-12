import React from 'react';
import './LoginButton.css'

const CLIENT_ID = '15dcac667eac4a248e56c9babfd7732a';
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/Menu";
const SCOPE = "user-top-read user-library-read";

function LoginButton() {
    const handleLogin = () => {
        let url = SPOTIFY_AUTHORIZE_ENDPOINT;
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(CLIENT_ID);
        url += '&scope=' + encodeURIComponent(SCOPE);
        url += '&redirect_uri=' + REDIRECT_URL_AFTER_LOGIN;
        window.location = url;
    }
    return ( 
    <div className="buttonWrapper">
        <button className="loginButton" onClick={handleLogin}>Login With Spotify</button>
    </div>
    );
}

export default LoginButton;