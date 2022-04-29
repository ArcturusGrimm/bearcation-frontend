import React, { useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { useNavigate, Link } from "react-router-dom"

import axios from 'axios';
import '../styles/signup.css'
import "bootstrap/dist/css/bootstrap.min.css"

const signup = async (emailArg, passwordArg, firstnameArg, lastnameArg) => {
    const signUpDto = {
        email: emailArg,
        password: passwordArg,
        firstName: firstnameArg,
        lastName: lastnameArg
    };
    let response;
    await axios.post("https://bearcation-backend.herokuapp.com/account/createAccount", signUpDto)
        .then(res => {
            console.log(res);
            response = res.data;
        })
    return response;
}


const handleSubmit = async (e, navigate, email, password, confirmPassword, firstname, lastname) => {
    e.preventDefault();

    if(!(email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    )){
        alert("Please use a valid email address.");
        return;
    }
    if(password.length < 6){
        alert("Password must be at least 6 characters long.");
        return;
    }
    if(password !== confirmPassword){
        alert("Confirm password must match entry for password.");
        return;
    }

    const response = await signup(email, password, firstname, lastname);
    if(response !== ""){
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
    const [role, setRole] = useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const navigate = useNavigate();

    return (
        <div className="signup-page">
            <div className="signup-body">
                <h2 className="create-tag">Create your Bearcation Account</h2>
                <form className = "signup-form" onSubmit={e => handleSubmit(e, navigate, email, password, confirmPassword, firstname, lastname)} >
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
                    <div className="signup-role-container">
                        <FormControl size="small" className="signup-role-form">
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                value={role}
                                label="Role"
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Customer">Customer</MenuItem>
                                <Divider/>
                                <MenuItem value="Owner">Owner</MenuItem>
                            </Select>
                        </FormControl>
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