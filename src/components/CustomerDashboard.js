import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';

import '../styles/customerDashboard.css'
import HeaderBar from "./HeaderBar";
import axios from "axios";

const Person = {
    firstName: "Francis",
    lastName: "Boyle"
}
const parkExampleArray = [
    { name: "Alaska National Park" },
    { name: "Utah National Park"},
    { name: "Utah National Park"},
    { name: "Utah National Park"},
    { name: "Utah National Park"}
]
const parkExample = { name: "Alaska National Park" }

function DashboardParkCard({ park }, navigate){
    return(
        <div className="customer-dashboard-park-card">
            <h5 className="customer-dashboard-location-text">{park.name}</h5>
            <div className="customer-dashboard-location-navigate">
                <IconButton
                    className="customer-dashboard-location-navigate-button"
                >
                    <TravelExploreIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
}

function CustomerDashboard() {

    const [vacationLocation, setVacationLocation] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const [locations, setLocations] = useState(null);
    useEffect(async () =>{
        let response;
        await axios.get("http://localhost:80/location/locations")
            .then(res => {
                response = res.data;
            })
        //setLocations(response);
    }, []);

    return (
        <div className="customer-dashboard-page">
            <HeaderBar />
            <div className="customer-dashboard-body">
                <div className="customer-dashboard-details">
                    <h1 className="customer-dashboard-welcome-text">
                        <b>Hello, {location.state.fName}!</b>
                    </h1>
                    <Link to="/explore">
                        <h2 className="customer-dashboard-explore-text">
                            Explore National Parks and Landmarks!
                        </h2>
                    </Link>
                    <Link to="/">
                        <h2 className="customer-dashboard-settings-text">
                            Edit Settings
                        </h2>
                    </Link>
                </div>
                <div className="customer-dashboard-parks">
                    <h2>View Recommended Parks:</h2>
                    {

                        1 > 0
                            ? (
                                <div className="customer-dashboard-recommended-parks">
                                    {/*{locations.map((park) => <DashboardParkCard park={park}/>)}*/}
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

export default CustomerDashboard;

