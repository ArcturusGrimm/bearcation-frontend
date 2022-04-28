import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {useLocation, useNavigate} from "react-router-dom";

import '../styles/customerDetails.css'

const person = {
    'firstname': 'Patrick',
    'lastname': 'Boyle',
    'email': 'patrick_boyle1@baylor.edu'
}


function CustomerDetails () {

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className="customer-page">
            <div className="customer-page-body">
                {/* Name */}
                <h3 className="customer-name-text"><b>{person.firstname} {person.lastname}</b></h3>

                {/* Description */}
                <h6 className="customer-email-text">
                    <b>Email: </b>
                    {person.email}
                </h6>

            </div>
        </div>
    );
}

export default CustomerDetails;
