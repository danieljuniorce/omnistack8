import React, { useState } from 'react';

import './Login.css';
import logo from './../assets/logo.svg';

import api from './../services/api';

export default function Login({ history })
{
    const [ username, setUsername ] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const requestResponse = await api.post('/devs', {
            username
        });

        const { _id } = requestResponse.data;

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit}>
                <img src={ logo } alt="logo"/>
                <input
                    placeholder="Digite seu username do GITHUB"
                    value={ username }
                    onChange={ e => setUsername(e.target.value) }
                />
                <button type="submit">ENTRAR</button>
            </form>
        </div>
    );
}

