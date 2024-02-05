import React from 'react'
import { useEffect, useState } from "react"
import { NewAudioForm } from './NewAudioForm'
import { AudioList } from './AudioList'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
    const [audios, setAudios] = useState([]);
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/get-all")
        .then((res) => res.json())
        .then((data) => {
            setAudios(data);
        });
    }, []);

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/')
        } catch {
            setError('Failed to log out')
        }
    }

    function deleteAudio(id) {
        setAudios(currentAudios => {
        return currentAudios.filter(audio => audio._id !== id)
        })
    }

    return (
        <header className="App-header">
            <div>
                {error && <p className='error'>{error}</p>}
                {currentUser ? 
                    <div>
                        <button onClick={handleLogout}>Log Out</button>
                        <Link to="/manage">{currentUser.email}</Link>
                    </div>
                : null}
            </div>
            <h1>mpthree</h1>
            <NewAudioForm userId={currentUser.uid} />
            <h2>Uploaded mpthrees</h2>
            <AudioList audios={audios} deleteAudio={deleteAudio} />
        </header>
    )
}
