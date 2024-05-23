import React, { useEffect } from 'react';
import axios from 'axios';

const DiscordLoginButton = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const data = {
                client_id: '1243206551972479087',
                client_secret: 'kzCa5IF4OjStANyvqFkuvp-c3poFyb1p',
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:3000/oauth/redirect',
                scope: 'identify email',
            };

            axios.post('https://discord.com/api/oauth2/token', new URLSearchParams(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then((response) => {
                    console.log(response.data.access_token);
                    localStorage.setItem('discord_access_token', response.data.access_token);
                    window.location.href = 'http://localhost:5173/LLMfront'; 
                })
                .catch((error) => {
                    console.error('Error fetching Discord token:', error);
                });
        }
    }, []);

    const discordLogin = () => {
        window.location.href = 'http://localhost:3000/auth/discord';
    };

    return (
        <button onClick={discordLogin}>Login with Discord</button>
    );
};

export default DiscordLoginButton;
