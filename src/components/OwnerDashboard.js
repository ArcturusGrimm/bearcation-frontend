import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import { useLoadScript, Circle, GoogleMap, Marker } from "@react-google-maps/api";


import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import "../styles/ownerDashboard.css";
import HeaderBar from "./HeaderBar";
import axios from "axios";
import { baseUrl } from "../App";

const handleDeleteLocation = async (e, navigate, id) => {
    e.preventDefault();
    await axios.get(baseUrl + "location/delete/" + id)
}

const handleEditLocation = async (e, navigate, id) => {
    e.preventDefault();
    navigate("/editLocation", { state: { id: id } });
};

function DashboardParkCard(park, navigate, refresh, setRefresh) {
    return (
        <div className="owner-dashboard-park-card">
            <h5 className="owner-dashboard-location-text">{park.name}</h5>
            <div className="owner-dashboard-location-navigate">
                <IconButton className="owner-dashboard-edit-button">
                    <EditIcon
                        fontSize="small"
                        onClick={(e) => handleEditLocation(e, navigate, park.id)}
                    />
                </IconButton>
                <IconButton className="owner-dashboard-delete-button">
                    <DeleteIcon
                        fontSize="small"
                        onClick={(e) => {handleDeleteLocation(e, navigate, park.id); setRefresh(refresh + 1)}}
                    />
                </IconButton>
            </div>
        </div>
    );
}

function OwnerDashboard() {
    const { auth } = useAuth();

    const [vacationLocation, setVacationLocation] = useState([]);
    const [refresh, setRefresh] = useState(0);
    
    const mapRef = useRef();
    const contCenterOfUS = useMemo(() => ({ lat: 39.8283, lng: -98.5795 }), []);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(async () => {
        let response;
        await axios.get(baseUrl + "location/search/user/" + auth.id)
            .then(res => {
                console.log(res);
                response = res.data;
            });
        console.log(response);
        setVacationLocation(response);
        console.log(response)
    }, [refresh]);

    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA3kz9oH9nUDtfo8K4xpks2-KVkP26-IKo",
        libraries: ["places"],
    });
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="owner-dashboard-page">
            <HeaderBar />
            <div className="owner-dashboard-body">
                <div className="owner-dashboard-details">
                    <h1 className="owner-dashboard-welcome-text">
                        <b>Hello, {auth.firstName}!</b>
                    </h1>
                    <Link to="/settings">
                        <h2 className="owner-dashboard-settings-text">Edit Settings</h2>
                    </Link>
                </div>

                <Button
                    variant="success"
                    className="owner-add-park-button"
                    onClick={() => navigate("/facility")}
                >
                    <MdAddCircleOutline /> Add a Park
                </Button>
                <div className="owner-dashboard-parks">
                    <h2>Manage Parks:</h2>
                    {vacationLocation.length > 0 ? (
                        <div className="owner-dashboard-recommended-parks">
                            {vacationLocation.map((park) => DashboardParkCard(park, navigate, refresh, setRefresh))}
                        </div>
                    ) : (
                        <div>Add a park by clicking the button above.</div>
                    )}
                </div>
                <div className="owner-map-parks">
                    <h2>Map with Your Parks</h2>
                    <div className="owner-map-group">
                        <GoogleMap
                            zoom={4}
                            center={contCenterOfUS}
                            mapContainerClassName="owner-dashboard-map-container"
                            onLoad={onLoad}
                        >
                            {vacationLocation?.map((park) => (
                                (park.latitude >= -90 && park.latitude <= 90) && 
                                (park.longitude >= -180 && park.longitude <= 180) && (
                                    <Marker
                                        position={{ lat: park.latitude, lng: park.longitude }}
                                    />
                                )
                            ))}
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnerDashboard;
