import React from 'react';
import LoginHero from '../../Components/LoginHero/LoginHero';
import LoginButton from '../../Components/LoginButton/LoginButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            navigate('/');
        }
    });
    return (
        <div>
            <LoginHero />
            <LoginButton />
        </div>
    );
}

export default Login;