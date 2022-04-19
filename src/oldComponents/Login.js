import React, {useCallback, useMemo, useRef, useState} from "react";
import { Navigate } from "react-router-dom"

import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Routes, NavLink, Link, withRouter} from "react-router-dom";
import UserService from '../services/UserService';
import axios from 'axios';

// function Login(){

//     const [username, setUsername] = useState();
//     const [password, setPassword] = useState();

//     const componentDidMount = () => {
//         UserService.getUsers().then((response) => {
//             this.accounts = response.data;
//         });
//     } 
//     const handleSubmit = () => {
//         const userDto = {
//             username: username,
//             password: password
//         };
    
//         alert(userDto.username)
    
//         /*const response = await login(userDto.username, userDto.password);
//         if(response != null){
//             this.props.history.push({
//                 pathname: '/home',
//                 state: {user: userDto.username}
//             })
//         }else{
//             alert("Credentials do not match any account.")
//         }*/
//     }

//     return (
//         <div className="loginBody">
//             <h1>Login</h1>
//             <form className = "loginForm" >
//                 <div className="usernameArea">
//                     <label>
//                         Username:
//                     </label>
//                     <input name = "username" className="usernameBox" value={setUsername(username)} type="text" onChange={} required />
//                 </div>
//                 <div className="passwordArea">
//                     <label>
//                         Password:
//                     </label>
//                     <input name = "password" className="passwordBox" value={setUsername(username)} type="text" onChange={this.handleInputChange} required />
//                 </div>
//                 <div className="submitArea">
//                     <input type="submit" value="Submit" onSubmit={this.handleSubmit} />
//                 </div>
//             </form>
//             <div className={"forgotPassword"}>
//                 <nav>
//                     <Link to="/forgot-password">Forgot Password?</Link>
//                 </nav>
//             </div>
//             <div className={"createAccount"}>
//                 <nav>
//                     <Link to="/signup">Create Account</Link>
//                 </nav>
//             </div>
//             <br />
//         </div>
//     )
// } export default Login;

class Login extends React.Component {
    accounts = [];
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeStatus(event) {
        this.setState({value: event.target.value});
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

    async handleSubmit(event) {
        event.preventDefault();
        const userDto = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.history.push('/home')


        /*const response = await login(userDto.username, userDto.password);
        if(response != null){
            this.props.history.push({
                pathname: '/home',
                state: {user: userDto.username}
            })
        }else{
            alert("Credentials do not match any account.")
        }*/
    }

    render() {
        return (
            <div className="loginBody">
                <h1>Login</h1>
                <form className = "loginForm" onSubmit={this.handleSubmit}>
                    <div className="usernameArea">
                        <label>
                            Username:
                        </label>
                        <input name = "username" className="usernameBox" value={this.state.username} type="text" onChange={this.handleInputChange} />
                    </div>
                    <div className="passwordArea">
                        <label>
                            Password:
                        </label>
                        <input name = "password" className="passwordBox" value={this.state.password} type="text" onChange={this.handleInputChange} />
                    </div>
                    <div className="submitArea">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                <div className={"forgotPassword"}>
                    <nav>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </nav>
                </div>
                <div className={"createAccount"}>
                    <nav>
                        <Link to="/signup">Create Account</Link>
                    </nav>
                </div>
            </div>
            
        );
    }
}

export default Login;