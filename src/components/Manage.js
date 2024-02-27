import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from  'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { AudioList } from './AudioList'

export default function Manage() {
    const [audios, setAudios] = useState([]);
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signup, currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate() 

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-all/`)
        .then((res) => res.json())
        .then((data) => {
            setAudios(data);
        });
    }, []);

    function deleteAudio(id) {
        setAudios(currentAudios => {
        return currentAudios.filter(audio => audio._id !== id)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setError('')
        setLoading(true)

        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
          navigate('/')
        }).catch(() => {
          setError('Failed to update account')
        }).finally(() => {
          setLoading(false)
        })
    }

    return (
        <div className='main'>
          <Helmet>
            <title>Manage - mpthree</title>
          </Helmet>
          <div>
            <h1>manage</h1>
            <Link className="btn" to="/">Return Home</Link>
          </div>
          <div>
            <h2>profile</h2>
            {error && <p className='error'>{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
              <input name='email' type='email' ref={emailRef} defaultValue={currentUser.email} required></input>
              <input name='password' type='password' ref={passwordRef} placeholder='Password Unchanged'></input>
              <input name='password-conf' type='password' ref={passwordConfRef} placeholder='Confirm New Password'></input>
              <input className="btn" type='submit' value='Update Profile' disabled={loading}/>
            </form>
          </div>
          <div>
            <h2>Manage Uploaded Mpthrees</h2>
            <AudioList audios={audios.filter((audio) => audio.uploaderId == currentUser.uid)} deleteAudio={deleteAudio} userId={currentUser.uid} />
          </div>
        </div>
    )
}