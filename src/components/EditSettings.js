import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/editSettings.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const handleSave = async (e, navigate, id, firstName, lastName, email) => {
    e.preventDefault();
    
    if (firstName.length < 1 && firstName.length > 255) {
        alert("Invalid first name.");
        return;
    }
    if (lastName.length < 1 && lastName.length > 255) {
        alert("Invalid last name.");
        return;
    }
    if (
        !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
        alert("Please use a valid email address.");
        return;
    }
    if (email.length > 255) {
        alert("Please use a valid email address.");
        return;
    }
    
    const userDto = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
    };
    let response;
    await axios.patch("http://localhost:80/account/editAccount", userDto)
        .then(res => {
            console.log(res);
            response = res.data;
        });
    if (response !== "") {
        navigate("/");
    } else {
        alert("Credentials do not match any account.");
    }
};

function EditSettings() {
    const { auth } = useAuth();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [credentials, setCredentials] = useState();

    const navigate = useNavigate();

    useEffect(async () => {
        let response;
        await axios.get("http://localhost:80/user/" + auth.id)
            .then(res => {
                console.log(res);
                response = res.data;
            })
        console.log(response)
        setCredentials(response);
        setFirstname(response.firstName);
        setLastname(response.lastName);
        setEmail(response.email);
    }, []);

    return (
        <div className="settings-page">
            <div className="settings-body">
                <h2 className="settings-create-tag">Edit your Account Settings</h2>
                <form className="settings-form">
                    <div className="settings-username-group form-group">
                        <input
                            name="firstname"
                            className="form-control settings-first-name-text"
                            placeholder="First Name"
                            value={firstname}
                            type="text"
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                        <input
                            name="lastname"
                            className="form-control settings-last-name-text"
                            placeholder="Last Name"
                            value={lastname}
                            type="text"
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="settings-email-group form-group">
                        <input
                            name="email"
                            className="form-control settings-email-text"
                            placeholder="Email"
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* <div className="settings-password-group form-group">
                        <input name = "password" className="form-control" placeholder="Password" value={password} type="password" onChange={e => setPassword(e.target.value)} required />
                    </div> */}
                    <input
                        type="submit"
                        className="btn btn-dark btn-block settings-submit"
                        value="Save"
                        onClick={(e) =>
                            handleSave(e, navigate, auth.id, firstname, lastname, email)
                        }
                    />
                    <input
                        type="button"
                        className="btn btn-dark btn-block settings-cancel"
                        value="Cancel"
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                </form>
            </div>
        </div>
    );
}
export default EditSettings;
