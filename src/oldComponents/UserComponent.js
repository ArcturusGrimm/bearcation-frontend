import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Routes, NavLink, Link} from "react-router-dom";
import UserService from '../services/UserService';

import axios from 'axios';
import ForgotPassword from "../components/ForgotPassword";
import { baseUrl } from '../App';

class UserComponent extends React.Component {
    accounts = [];
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeStatus(event) {
        this.setState({level: event.target.value});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.accounts = response.data;
        });
    }


    handleSubmit(event) {

        const userDto = {
            password: this.state.password,
            username: this.state.username,
        };

        axios.post(baseUrl + "user/users", userDto)
            .then(res => {
                console.log('Account added successfully!');
                console.log(res);
                this.setState( {
                    username: res.data.username,
                    password: res.data.password
                });
                alert("Welcome " + this.state.username + " " + this.state.password);
            })

        event.preventDefault();
    }



    render() {
        return (
            <div>
                <h1>Create Account</h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            Username:
                        </label>
                        <input name = "username" className="form-control" value={this.state.username} type="text" onChange={this.handleInputChange} />

                    </div>
                    <div>
                        <label>
                            Password:
                        </label>
                        <input name = "password"  value={this.state.password} type="text" onChange={this.handleInputChange} />

                    </div>
                    <input type="submit" value="Submit" />
                </form>
                <div className={"login"}>
                        <nav>
                            <Link to="/">Already have an account?</Link>
                        </nav>
                </div>
                <br />
                <label>{this.state.message}</label>
            </div>
        );
    }
}

export default UserComponent;