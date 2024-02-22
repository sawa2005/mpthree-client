import React, { useState, useRef } from 'react'
import { Helmet } from  'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for instructions!')
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
        
    }

    return (
        <div className='signup'>
            <Helmet>
                <title>Password Reset - mpthree</title>
            </Helmet>
            <div>
                <h1>mpthree</h1>
                <Link className="btn" to="/">Return Home</Link>
                <h2>Reset Password</h2>
                {error && <p className='error'>{error}</p>}
                <form className='form' onSubmit={handleSubmit}>
                    <input name='email' type='email' ref={emailRef} placeholder='Email' required></input>
                    <input className='btn' type='submit' value='Reset Password' disabled={loading}/>
                </form><br />
                {message && <p className='success'>{message}</p>}
                <Link className='btn' to="/login">Cancel</Link>
            </div><br />
            <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}