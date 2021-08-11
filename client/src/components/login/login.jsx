import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import './login.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
function Login() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {user,dispatch} = useContext(AuthContext)
    const handleSubmit=(event)=>{
        event.preventDefault()
        const logincall = async(userCredential,dispatch)=>{
            dispatch({type:"LOGIN_START"});
            try {
                const res = await axios.post('auth/login',{email,password})
                dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            } catch (error) {
                dispatch({type:"LOGIN_FAILURE",error:error})
            }
        }
        logincall({email,password},dispatch)
    }
    return (
        <div className ="login">
            <div className = "container">
                <div className = "row">
                    <div className = "col-12 col-md-12">
                        <h3 className="login-heading">Please Login</h3>
                        <div className = "form">
                            <form onSubmit = {handleSubmit}>
                                <label htmlFor="email" className = "form-label">Email: </label><br />
                                <input type="email" name = "email" value = {email} onChange = {e=>setEmail(e.target.value)} className="form-control"/> <br />
                                <label htmlFor="password">Password: </label> <br />
                                <input type="password" name="password" value = {password} onChange = {e=>setPassword(e.target.value)} className="form-control"/> <br />
                                <div className = "buttons">
                                    <input type="submit" name = "submit" value = "Login" className = "btn-login"/>
                                    <Link to = "/register" className = "btn-register">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
