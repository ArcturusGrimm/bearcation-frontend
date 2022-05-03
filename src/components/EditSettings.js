import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import "../styles/editSettings.css"

function EditSettings(){

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

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
                    <input type="submit" className="btn btn-dark btn-block settings-submit" value="Save" />
                    <input type="button" className="btn btn-dark btn-block settings-cancel" value="Cancel" onClick={() => {navigate(-1)}} />
                </form>
            </div>
        </div>
    );
}
export default EditSettings;