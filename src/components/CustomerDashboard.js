import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useAuth from '../hooks/useAuth';
import { useNavigate, Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';

import '../styles/customerDashboard.css'
import HeaderBar from "./HeaderBar";

import DashboardParkCard from "./DashboardParkCard";
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

function ReviewCard({review}){
    return(
        <div className="review-card">
            <h5 className="review-card-rating">Rating: {review.rating} </h5>
            <h5 className="review-card-description">Description: {review.description} </h5>
        </div>
    );
}


function CustomerDashboard() {
    const { auth } = useAuth();

    const [vacationLocation, setVacationLocation] = useState();
    const navigate = useNavigate();

    const location = useLocation();

    const [locations, setLocations] = useState();
    const [reviews, setReviews] = useState();
    useEffect(async () =>{
        let response;
        const recommendDto = {
            latitude: 35.55,
            longitude: 97.15,
            price: 0.0,
            activities: []
        };
        await axios.post("http://localhost:80/location/search", recommendDto)
            .then(res => {
                response = res.data;
                console.log(response);
            })
            setLocations(response);
    }, []);


    useEffect(async () =>{
        let response;
        await axios.get("http://localhost:80/review/search/user/" + auth.id)
            .then(res => {
                response = res.data;
                console.log(response);
            })
        setReviews(response);
    }, []);





    return (
        <div className="customer-dashboard-page">
            <HeaderBar />
            <div className="customer-dashboard-body">
                <div className="customer-dashboard-details">
                    <h1 className="customer-dashboard-welcome-text">
                        <b>Hello, {auth.firstName}!</b>
                    </h1>
                    <Link to="/explore">
                        <h2 className="customer-dashboard-explore-text">
                            Explore National Parks and Landmarks!
                        </h2>
                    </Link>
                    <Link to="/settings">
                        <h2 className="customer-dashboard-settings-text">
                            Edit Settings
                        </h2>
                    </Link>
                    <Link to="/directory">
                        <h2 className="customer-dashboard-directory-text">
                            Directory
                        </h2>
                    </Link>
                </div>
                <div className="customer-dashboard-parks">
                    <h2>View Recommended Parks:</h2>
                    {

                        locations
                        ? (
                            <div className="customer-dashboard-recommended-parks">
                                {locations.map((park) => <DashboardParkCard park={park}/>)}
                            </div>
                        ) : (
                            <div>
                                Sorry, we do not have any recommended parks.
                            </div>
                        )
                    }
                    <h2>View Reviews:</h2>
                    {

                        reviews
                            ? (
                                <div className="customer-dashboard-recommended-parks">
                                    {reviews.map((review) => <ReviewCard review={review}/>)}
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

