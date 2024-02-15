import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to sign in')
        }

        setLoading(false)
        
    }

    return (
        <div className='signup'>
            <div>
                <h1>mpthree</h1>
                <Link className="btn" to="/">Return Home</Link>
                <h2>Log In</h2>
                {error && <p className='error'>{error}</p>}
                <form className='form' onSubmit={handleSubmit}>
                    <input name='email' type='email' ref={emailRef} placeholder='Email' required></input>
                    <input name='password' type='password' ref={passwordRef} placeholder='Password' required></input>
                    <input className='btn' type='submit' value='Log In' disabled={loading}/>
                </form><br />
                <div>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div><br />
            </div>
            <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}