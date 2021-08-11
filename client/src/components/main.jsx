import React, { useContext } from 'react'
import Login from './login/login'
import Register from './register/register'
import HomeMain from './homeMain/HomeMain'
import AdminMain from './adminMain/AdminMain'
import {Switch,Route,Redirect} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AdminPage = ({user})=>{
    if(!user){
        return(<Redirect to = "/login"/>)
    }
    else{
        if(user.isAdmin){
            return(<AdminMain/>)
        }
        else{
            return(<Redirect to = "/home"/>)
        }
    }
}

const HomePage = ({user})=>{
    if(!user){
        return(<Redirect to = "/login"/>)
    }
    else{
        if(user.isAdmin){
            return(<Redirect to ="/admin"/>)
        }
        else{
            return(<HomeMain/>)
        }
    }
}
const LoginPage = ({user})=>{
    if(!user){
        return(<Login/>)
    }
    else{
        if(user && user.isAdmin){
            return(<Redirect to = "/admin"/>)
        }
        else{
            return(<Redirect to ="/home"/>)
        }
    }
}
function Main() {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Switch>
                <Route path = "/login">
                    <LoginPage user = {user}/>
                </Route>
                <Route path = "/register">
                    <Register/>
                </Route>
                <Route exact path = "/home">
                    <HomePage user = {user}/>
                </Route>
                <Route exact path = "/admin">
                    <AdminPage user = {user}/>
                </Route>
                <Redirect to = "/login"/>
            </Switch>
        </div>
    )
}

export default Main
