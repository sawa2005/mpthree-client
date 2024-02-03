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
                <h2>Log In</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' ref={emailRef} required></input><br />
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' ref={passwordRef} required></input><br />
                    <input type='submit' value='Log In' disabled={loading}/>
                </form>
                <div>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </div>
            <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}