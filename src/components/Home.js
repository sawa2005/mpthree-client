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
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-all/`)
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
        <div className='main'>
            <header>
                <h1>mpthree</h1>
                <div>
                    {error && <p className='error'>{error}</p>}
                    {currentUser ? 
                        <div>
                            <p>Logged in as: {currentUser.email}</p>
                            <div className="acc-nav">
                                <button type="button" className="btn" onClick={handleLogout}>Log Out</button>
                                <Link className="btn" to="/manage">Manage</Link>
                            </div>
                        </div>
                    : <div className="acc-nav">
                        <Link to="/login" className="btn">Log In</Link>
                        <Link to="/signup" className="btn">Sign Up</Link>
                    </div>}
                </div>
            </header>
            {currentUser ? <NewAudioForm userId={currentUser.uid} /> : <p>You have to be logged in before you can upload mpthrees</p>}
            <div>
                <h2>Recently uploaded mpthrees</h2>
                <AudioList audios={audios} deleteAudio={deleteAudio} />
            </div>
        </div>
        
    )
}
