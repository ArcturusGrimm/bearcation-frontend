import React, { useState} from "react";
import { useNavigate, Link } from "react-router-dom"

import axios from 'axios';
import '../styles/forgotPassword.css'
import "bootstrap/dist/css/bootstrap.min.css"
import HeaderBar from "./HeaderBar";
import { baseUrl } from "../App";

const handleSubmit = async(e, navigate, firstName, email, password) => {
    e.preventDefault();
    const forgotPasswordDto = {
        first: firstName,
        email: email,
        password: password
    };
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    if (password.length > 255) {
        alert("The password is too long.");
        return;
    }
    let response;
    await axios.post(baseUrl + "account/forgotPassword", forgotPasswordDto)
        .then(res => {
            console.log(res);
            response = res.data;
        })

    if(response !== ""){
        let response2;
        await axios.post(baseUrl + "account/updatePassword", forgotPasswordDto)
            .then(res => {
                console.log(res);
                response2 = res.data;
            })
        if(response2 !== "") {
            navigate('/')
        }
        else{
            alert("Error updating password.")
        }
    }else{
        alert("Credentials do not match any account.")
    }
}


function NewForgotPassword(){
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    return (
        <div className="forgot-password-page">
            <div className="forgot-password-body">
                <h2 className="forgot-password-tag">Forgot Password</h2>
                <form className = "forgot-password-form" onSubmit={e => handleSubmit(e, navigate, firstName, email, password)} >
                    <div className="forgot-password-firstName-group form-group">
                        <input name = "firstName" className="form-control forgot-password-firstName-text" placeholder="Security Question: What is your first name?" value={firstName} type="text" onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="forgot-password-email-group form-group">
                        <input name = "email" className="form-control forgot-password-email-text" placeholder="Email" value={email} type="text" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="forgot-password-password-group form-group">
                        <input name = "password" className="form-control forgot-password-password-text" placeholder="New Password" value={password} type="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <input type="submit" className="btn btn-dark btn-block submit" value="Update" />
                </form>
            </div>
        </div>
    )
}


export default NewForgotPassword;