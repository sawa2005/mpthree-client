import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
        
    }

    return (
        <div className='signup'>
            <div>
                <h2>Sign up</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' ref={emailRef} required></input><br />
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' ref={passwordRef} required></input><br />
                    <label htmlFor='password-conf'>Confirm Password</label>
                    <input name='password-conf' type='password' ref={passwordConfRef} required></input><br />
                    <input type='submit' value='Sign Up' disabled={loading}/>
                </form>
            </div>
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}