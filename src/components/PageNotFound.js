import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { IoIosHome } from "react-icons/io";

function PageNotFound() {

    const navigate = useNavigate();


    return (
        <div>
            <h1><b>Page Does NOT Exist.</b></h1>
            <Button 
                variant="success"
                onClick={() => navigate('/')}
            >
                <IoIosHome/>{' '}
                Home
            </Button>
        </div>
    );
}
export default PageNotFound;