import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'react-bootstrap/Button';


import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { MdAddCircleOutline } from "react-icons/md";
import {useNavigate, Link, useLocation} from "react-router-dom";
import useAuth from '../hooks/useAuth';

import '../styles/ownerDashboard.css'
import HeaderBar from "./HeaderBar";
import axios from "axios";


const Person = {
    firstName: "Francis",
    lastName: "Boyle"
}

const parkExampleArray = [
    { name: "Alaska National Park" },
    { name: "Utah National Park"}
]
const parkExample = { name: "Alaska National Park" }

const handleDeleteLocation = async(e, navigate, id) => {
    e.preventDefault();
    await axios.get("https://bearcation-backend.herokuapp.com/location/delete/" + id)
    navigate('/owner-dashboard')
}

const handleEditLocation = async(e, navigate, id) => {
    e.preventDefault();
    navigate('/editLocation', {state:{id: id}})
}


function DashboardParkCard(park, navigate){
    return(
        <div className="owner-dashboard-park-card">
            <h5 className="owner-dashboard-location-text">{park.name}</h5>
            <div className="owner-dashboard-location-navigate">
                <IconButton
                    className="owner-dashboard-edit-button"
                >
                    <EditIcon fontSize="small" onClick={e => handleEditLocation(e, navigate, park.id)}/>

                </IconButton>
                <IconButton
                    className="owner-dashboard-delete-button"
                >
                    <DeleteIcon
                        fontSize="small"
                        onClick={e => handleDeleteLocation(e, navigate, park.id)}
                    />
                </IconButton>
            </div>
        </div>
    );
}

function OwnerDashboard() {

    const { auth } = useAuth();

    const [vacationLocation, setVacationLocation] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(async () =>{
        let response;
        await axios.get("https://bearcation-backend.herokuapp.com/location/search/user/" + auth.id)
            .then(res => {
                console.log(res);
                response = res.data;
            })
        console.log(response)
        setVacationLocation(response);
    }, []);

    return (
        <div className="owner-dashboard-page">
            <HeaderBar />
            <div className="owner-dashboard-body">
                <div className="owner-dashboard-details">
                    <h1 className="owner-dashboard-welcome-text">
                        <b>Hello, {auth.firstName}!</b>
                    </h1>
                    <Link to="/settings">
                        <h2 className="owner-dashboard-settings-text">
                            Edit Settings
                        </h2>
                    </Link>
                </div>

                <Button 
                    variant="success"
                    className="owner-add-park-button"
                    onClick={() => navigate('/facility')}
                >
                    <MdAddCircleOutline/>{' '}
                    Add a Park
                </Button>
                <div className="owner-dashboard-parks">
                    <h2>Manage Parks:</h2>
                    {
                        vacationLocation
                        ? (
                            <div className="owner-dashboard-recommended-parks">
                                {vacationLocation.map((park) => DashboardParkCard(park, navigate))}
                            </div>
                        ) : (
                            <div>
                                Sorry, we do not have any recommended parks.
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default OwnerDashboard;

