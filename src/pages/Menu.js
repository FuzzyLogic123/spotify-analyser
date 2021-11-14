import { React, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './Menu.css'



const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});
    return paramsSplitUp
};

function Menu() {
    let navigate = useNavigate();
    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
            //remove hash in url
            navigate("/Menu", {replace: true});
            localStorage.clear();

            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
    });
    return (
        <div className="menuWrapper">
        <div className="menuItems">
                <Link className='menuItem' to="/insights">INSIGHTS</Link>
                <Link className='menuItem' to="/topTracks">TOP TRACKS</Link>
                <Link className='menuItem' to="/topArtists">TOP ARTISTS</Link>
        </div>
        </div>
    );
}

export default Menu;