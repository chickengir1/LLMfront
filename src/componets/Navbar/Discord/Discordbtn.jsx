import React, { useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = '1243206551972479087';
const CLIENT_SECRET = 'kzCa5IF4OjStANyvqFkuvp-c3poFyb1p';
const REDIRECT_URI = 'http://localhost:3000/oauth/redirect';
const DISCORD_TOKEN_URL = 'https://discord.com/api/oauth2/token';
const DISCORD_AUTH_URL = `http://localhost:3000/auth/discord`;

const fetchDiscordToken = async (code) => {
    const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify email',
    };

    try {
        const response = await axios.post(DISCORD_TOKEN_URL, new URLSearchParams(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Discord token:', error);
        throw error;
    }
};

const handleDiscordLogin = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        try {
            const accessToken = await fetchDiscordToken(code);
            localStorage.setItem('discord_access_token', accessToken);
            window.location.href = 'http://localhost:5173/LLMfront';
        } catch (error) {
            console.error('Error handling Discord login:', error);
        }
    }
};

const DiscordLoginButton = () => {
    useEffect(() => {
        handleDiscordLogin();
    }, []);

    const discordLogin = () => {
        window.location.href = DISCORD_AUTH_URL;
    };

    return (
        <button onClick={discordLogin}>Login with Discord</button>
    );
};

export default DiscordLoginButton;
