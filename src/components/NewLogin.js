import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from "axios";
import "../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const handleSubmit = async (e, setAuth, navigate, email, password, role) => {
    e.preventDefault();
    const loginDto = {
        email: email,
        password: password,
        role: role
    };
    let response;
    await axios.post("http://localhost:80/account/login", loginDto)
        .then(res => {
            console.log(res);
            response = res.data;
        });

    let firstName = response.firstName;
    let id = response.id;
    if (response !== "" && role === "Customer") {
        // nameLast = response.lastName;
        setAuth({ id, firstName, email, password, role });
        navigate("/customer-dashboard");
    } else if (response !== "" && role === "Owner") {
        setAuth({ id, firstName, email, password, role });
        navigate("/owner-dashboard");
    } else {
        alert("Credentials do not match any account.");
    }
};

function NewLogin() {
    const { setAuth } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const navigate = useNavigate();

    return (
        <div className="login-page">
            <div className="login-body">
                <h2 className="welcome-tag">Welcome to Bearcation</h2>
                <form
                    className="login-form"
                    onSubmit={(e) => handleSubmit(e, setAuth, navigate, username, password, role)}
                >
                    <div className="username-group form-group">
                        <input
                            name="username"
                            className="form-control"
                            placeholder="Email"
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password-group form-group">
                        <input
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-role-container">
                        <FormControl size="small" className="login-role-form">
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={role}
                                label="Role"
                                onChange={handleChange}
                                required
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,

                                        "& .MuiButtonBase-root": {
                                            padding: 2,
                                            display: "block",
                                            color: "blue",
                                        },
                                        "& .MuiMenuItem-root": {
                                            padding: 2,
                                            display: "block",
                                            color: "blue",
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="Customer">Customer</MenuItem>
                                <Divider />
                                <MenuItem value="Owner">Owner</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <input type="submit" className="btn btn-dark btn-block submit" value="Submit" />
                </form>
                <div className="forgot-password">
                    <nav>
                        <Link className="login-text" to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </nav>
                </div>
                <div className="createAccount">
                    <nav>
                        <Link className="login-text" to="/signup">
                            Create Account
                        </Link>
                    </nav>
                </div>
                <div className="proceedAsGuest">
                    <nav>
                        <Link className="login-text" to="/explore" state={{ name: "guest" }}>
                            Proceed as Guest
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NewLogin;
