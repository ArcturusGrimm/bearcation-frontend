import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'react-bootstrap/Button';


import React, { useCallback, useMemo, useRef, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import {useNavigate, Link, useLocation} from "react-router-dom";

import '../styles/ownerDashboard.css'
import HeaderBar from "./HeaderBar";


const Person = {
    firstName: "Francis",
    lastName: "Boyle"
}

const parkExampleArray = [
    { name: "Alaska National Park" },
    { name: "Utah National Park"}
]
const parkExample = { name: "Alaska National Park" }

function DashboardParkCard({ park }, navigate){
    return(
        <div className="owner-dashboard-park-card">
            <h5 className="owner-dashboard-location-text">{park.name}</h5>
            <div className="owner-dashboard-location-navigate">
                <IconButton
                    className="owner-dashboard-edit-button"
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    className="owner-dashboard-delete-button"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
}

function OwnerDashboard() {

    const [vacationLocation, setVacationLocation] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="owner-dashboard-page">
            <HeaderBar />
            <div className="owner-dashboard-body">
                <div className="owner-dashboard-details">
                    <h1 className="owner-dashboard-welcome-text">
                        <b>Hello, {location.state.fName}!</b>
                    </h1>
                    <Link to="/">
                        <h2 className="owner-dashboard-settings-text">
                            Edit Settings
                        </h2>
                    </Link>
                </div>

                <Button 
                    variant="success"
                    className="owner-add-park-button"
                    onClick={() => navigate('/facility', {})}
                >
                    <MdAddCircleOutline/>{' '}
                    Add a Park
                </Button>
                <div className="owner-dashboard-parks">
                    <h2>Manage Parks:</h2>
                    {
                        parkExampleArray.length > 0 
                        ? (
                            <div className="owner-dashboard-recommended-parks">
                                {parkExampleArray.map((park) => <DashboardParkCard park={park}/>)}
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

