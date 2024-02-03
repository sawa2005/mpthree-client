import React, { useState, useRef } from 'react'
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
            <div>
                <h2>Reset Password</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' ref={emailRef} required></input><br />
                    <input type='submit' value='Reset Password' disabled={loading}/>
                </form>
                {message && <p className='success'>{message}</p>}
                <div>
                    <Link to="/login">Cancel</Link>
                </div>
            </div>
            <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}