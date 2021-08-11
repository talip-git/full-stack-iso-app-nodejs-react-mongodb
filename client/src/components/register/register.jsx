import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './register.css'

function Register() {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const handleSubmit = async (event)=>{
        event.preventDefault()
        try {
            const res = await axios.post('auth/register',{
                username,
                email,
                password,
            })
            clearState()
            res.data && window.location.replace('/login')
        } catch (error) {
            console.log(error)
        }
    }
    const clearState = ()=>{
        setUsername('')
        setPassword('')
        setEmail('')
    }
    return (
        <div className ="register">
            <div className = "container">
                <div className = "row">
                    <div className = "col-12 col-md-12">
                        <h3 className="login-heading">Please Register</h3>
                        <div className = "form">
                            <form onSubmit = {handleSubmit}>
                                <label htmlFor="username" className = "form-label">Username: </label><br />
                                <input type="text" name = "username" value = {username} onChange = {event =>setUsername(event.target.value)} className="form-control"/> <br />
                                <label htmlFor="email" className = "form-label">Email: </label><br />
                                <input type="text" name = "email" value = {email} onChange = {event =>setEmail(event.target.value)} className="form-control"/> <br />
                                <label htmlFor="password">Password: </label> <br />
                                <input type="password" name="password" value = {password} onChange = {event =>setPassword(event.target.value)} className="form-control"/> <br />
                                <div className = "buttons">
                                    <input type="submit" name = "submit" value = "Register" className = "btn-register"/>
                                    <Link to = "/login" className = "btn-cancel">Go Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
