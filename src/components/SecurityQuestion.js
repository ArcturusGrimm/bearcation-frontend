import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import "../styles/forgotPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";

const handleSubmit = async (e, navigate, username) => {
    e.preventDefault();
    const userDto = {
        username: username,
    };
    let response;
    await axios.post("https://bearcation-backend.herokuapp.com/user/check", userDto).then((res) => {
        console.log(res);
        response = res.data;
        //response = res.data.username;
    });

    console.log("response " + response);
    if (response !== "") {
        navigate("/home");
    } else {
        alert("Credentials do not match any account.");
    }
};

function NewForgotPassword() {
    const [securityAnswer, setSecurityAnswer] = useState();
    const navigate = useNavigate();
    return (
        <div className="security-question-page">
            <div className="security-question-body">
                <h2 className="security-question-tag">Forgot Password</h2>
                <form
                    className="security-question-form"
                    onSubmit={(e) => handleSubmit(e, navigate, username)}
                >
                    <div className="security-question-username-group form-group">
                        <input
                            name="username"
                            className="form-control security-question-username-text"
                            placeholder="Email"
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-dark btn-block submit" value="Next" />
                </form>
            </div>
        </div>
    );
}

export default NewForgotPassword;
