import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Manage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signup, currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

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
        <div className='signup'>
            <div>
                <h2>Update Profile</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' ref={emailRef} defaultValue={currentUser.email} required></input><br />
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' ref={passwordRef} placeholder='Unchanged'></input><br />
                    <label htmlFor='password-conf'>Confirm Password</label>
                    <input name='password-conf' type='password' ref={passwordConfRef} placeholder='Unchanged'></input><br />
                    <input type='submit' value='Update Profile' disabled={loading}/>
                </form>
            </div>
        </div>
    )
}