import React, { useState, useRef } from 'react'
import { Helmet } from  'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Creates user on form submit
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
            <Helmet>
                <title>Sign Up - mpthree</title>
            </Helmet>
            <div>
                <h1>mpthree</h1>
                <Link className="btn" to="/">Return Home</Link>
                <h2>Sign up</h2>
                {error && <p className='error'>{error}</p>}
                <form className='form' onSubmit={handleSubmit}>
                    <input name='email' type='email' ref={emailRef} placeholder='Email' required></input>
                    <input name='password' type='password' ref={passwordRef} placeholder='Password' required></input>
                    <input name='password-conf' type='password' ref={passwordConfRef} placeholder='Confirm Password' required></input>
                    <input className='btn' type='submit' value='Sign Up' disabled={loading}/>
                </form>
            </div><br />
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}