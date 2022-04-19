import React, { useState} from "react";
import { useNavigate, Link } from "react-router-dom"

import axios from 'axios';
import '../styles/forgotPassword.css'
import "bootstrap/dist/css/bootstrap.min.css"
import HeaderBar from "./HeaderBar";

 const handleSubmit = async(e, navigate, username) => {
    e.preventDefault();
    const userDto = {
        username: username,
    };
     let response;
    await axios.post("http://localhost:80/user/check", userDto)
     .then(res => {
         console.log(res);
         response = res.data;
         //response = res.data.username;
     })

    console.log("response " + response)
    if(response !== ""){
        navigate('/home')
    }else{
        alert("Credentials do not match any account.")
    }
}


function NewForgotPassword(){


    const [username, setUsername] = useState();
    const navigate = useNavigate();
    return (
        <div className="forgot-password-page">
            <HeaderBar/>
            <div className="forgot-password-body">
                <h2 className="forgot-password-tag">Forgot Password</h2>
                <form className = "forgot-password-form" onSubmit={e => handleSubmit(e, navigate, username)} >
                    <div className="forgot-password-username-group form-group">
                        <input name = "username" className="form-control forgot-password-username-text" placeholder="Email" value={username} type="text" onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <input type="submit" className="btn btn-dark btn-block submit" value="Next" />
                </form>
            </div>
        </div>
    )
}


export default NewForgotPassword;