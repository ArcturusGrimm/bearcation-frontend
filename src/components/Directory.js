import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import "../styles/directory.css";
import HeaderBar from "./HeaderBar";
import { ModalBody } from "react-bootstrap";
import axios from "axios";

const Person = {
    firstName: "Francis",
    lastName: "Boyle",
    email: "francis_boyle1@gmail.com",
};

function PersonCard({ person }) {
    return (
        <div className="person-card">
            <h5 className="person-name">
                Name: {person.firstName} {person.lastName}
            </h5>
            <h5 className="person-email">Email: {person.email}</h5>
        </div>
    );
}

function Directory() {
    const { auth } = useAuth();

    const [people, setPeople] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(async () => {
        let response;
        await axios.get("https://bearcation-backend.herokuapp.com/user/users")
            .then(res => {
                console.log(res);
                response = res.data;
            })
        console.log(response)
        setPeople(response);
    }, []);

    let array = [
        { firstName: "Francis", lastName: "Boyle", email: "francis_boyle1@baylor.edu" },
        { firstName: "Patrick", lastName: "Boyle", email: "patrick_boyle1@baylor.edu" },
    ];

    if (people.length == 0) {
        setPeople(array);
    }

    return (
        <div className="directory-page">
            <HeaderBar />
            <div className="directory-body">
                <div className="directory-details">
                    <h1 className="directory-welcome-text">
                        <b>Hello, {auth.firstName}!</b>
                        <br />
                        View other people who love using Bearcation!
                    </h1>
                </div>

                <div className="directory-people">
                    <h1>Users:</h1>
                    {people ? (
                        <div className="directory-person">
                            {console.log(people)}
                            {people.map((person) => (
                                <PersonCard person={person} />
                            ))}
                        </div>
                    ) : (
                        <div>Thanks for joining, you are the first one!</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Directory;
