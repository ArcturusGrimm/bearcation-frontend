import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import "../styles/editSettings.css"
import axios from "axios";
import useAuth from "../hooks/useAuth";

const handleSave = async(e, navigate, id, firstName, lastName, email) => {
    e.preventDefault();
    const userDto = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email
    };
    let response;
    await axios.patch("https://bearcation-backend.herokuapp.com/account/editAccount", userDto)
        .then(res => {
            console.log(res);
            response = res.data;
        })
    if (response !== "") {
        navigate('/');

    } else {
        alert("Credentials do not match any account.")
    }

}


function EditSettings(){

    const { auth } = useAuth();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [credentials, setCredentials] = useState();

    const navigate = useNavigate();

    useEffect(async () =>{
        let response;
        await axios.get("https://bearcation-backend.herokuapp.com/user/" + auth.id)
            .then(res => {
                console.log(res);
                response = res.data;
            })
        console.log(response)
        setCredentials(response);
        setFirstname(response.firstName)
        setLastname(response.lastName)
        setEmail(response.email)
    }, []);

    return(
        <div className="settings-page">
            <div className="settings-body">
                <h2 className="settings-create-tag">Edit your Account Settings</h2>
                <form className = "settings-form">
                    <div className="settings-username-group form-group">
                        <input name = "firstname" className="form-control settings-first-name-text" placeholder="First Name" value={firstname} type="text" onChange={e => setFirstname(e.target.value)} required />
                        <input name = "lastname" className="form-control settings-last-name-text" placeholder="Last Name" value={lastname} type="text" onChange={e => setLastname(e.target.value)} required />
                    </div>
                    <div className="settings-email-group form-group">
                        <input name = "email" className="form-control settings-email-text" placeholder="Email" value={email} type="text" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    {/* <div className="settings-password-group form-group">
                        <input name = "password" className="form-control" placeholder="Password" value={password} type="password" onChange={e => setPassword(e.target.value)} required />
                    </div> */}
                    <input type="submit" className="btn btn-dark btn-block settings-submit" value="Save"  onClick={e=> handleSave(e, navigate, auth.id, firstname, lastname, email)}/>
                    <input type="button" className="btn btn-dark btn-block settings-cancel" value="Cancel" onClick={() => {navigate(-1)}} />
                </form>
            </div>
        </div>
    );
}
export default EditSettings;