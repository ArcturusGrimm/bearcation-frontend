import React, { useState} from "react";
import { useNavigate, Link } from "react-router-dom"

import axios from 'axios';
import '../styles/signup.css'
import "bootstrap/dist/css/bootstrap.min.css"

const signup = async (username, password) => {
    return true;
}


const handleSubmit = async (e, navigate, firstname, lastname, password) => {
    e.preventDefault();

    const response = await signup((firstname + lastname), password);
    if(response != null){
        navigate('/')
    }else{
        alert("Credentials do not match any account.")
    }
}


function NewSignUp(){
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const navigate = useNavigate();

    return (
        <div className="signup-page">
            <div className="signup-body">
                <h2 className="create-tag">Create your Bearcation Account</h2>
                <form className = "signup-form" onSubmit={e => handleSubmit(e, navigate, firstname, lastname, password)} >
                    <div className="signup-username-group form-group">
                        <input name = "firstname" className="form-control first-name-text" placeholder="First Name" value={firstname} type="text" onChange={e => setFirstname(e.target.value)} required />
                        <input name = "lastname" className="form-control last-name-text" placeholder="Last Name" value={lastname} type="text" onChange={e => setLastname(e.target.value)} required />
                    </div>
                    <div className="email-group form-group">
                        <input name = "email" className="form-control signup-email-text" placeholder="Email" value={email} type="text" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="password-group form-group">
                        <input name = "password" className="form-control" placeholder="Password" value={password} type="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="confirm-password-group form-group">
                        <input name = "confirm-password" className="form-control" placeholder="Confirm Password" value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <input type="submit" className="btn btn-dark btn-block submit" value="Submit" />
                </form>
                <div className="login-tag">
                    <nav>
                        <Link className="signup-text" to="/">Sign In</Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}


export default NewSignUp;