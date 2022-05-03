import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useLoadScript, Circle, GoogleMap, Marker } from "@react-google-maps/api";
import {useLocation, useNavigate} from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Multiselect from 'multiselect-react-dropdown';
import { Slider } from '@mui/material';
import Button from '@mui/material/Button';
import HeaderBar from "./HeaderBar";
import useAuth from '../hooks/useAuth';



import "@reach/combobox/styles.css";
import '../styles/explore.css'
import NewPlaces from "./NewPlaces";
import axios from "axios";
import {map} from "react-bootstrap/ElementChildren";


const grandCanyon = {
    'name': 'Grand Canyon',
    'description': 'canyons',
    'distance': 53.1
};

function PlaceCard(park, navigate) {
    return (
        <div className="location-card">
            <div className="location-card-detail">
                <h3 className="location-card-detail-data">{park.name}</h3>
            </div>
            <div className="location-card-navigate">
                <IconButton
                    className="location-card-navigate-button"
                    onClick={e=>{(navigate('/location', {state:{id: park.id}}))}}
                >
                    <KeyboardArrowRightIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    );
}



function Explore() {

    const location = useLocation();
    const { auth } = useAuth();

    const [vacationLocation, setVacationLocation] = useState();
    const [places, setPlaces] = useState([]);
    const [loadAdvancedSearch, setLoadAdvancedSearch] = useState(false);
    const [activities, setActivities] = useState([]);
    const [price, setPrice] = useState(50);
    console.log(vacationLocation);
    const mapRef = useRef();
    const center = useMemo(
        () => ({ lat: 31.5489, lng: -97.1131 }),
        []
    );


    const [apiActivities, setApiActivities] = useState();

    useEffect(async () =>{
        let response;
        await axios.get("https://bearcation-backend.herokuapp.com/location/activities")
            .then(res => {
                console.log(res);
                response = res.data;
            })
        setApiActivities(response);
    }, []);

    const [locations, setLocations] = useState();

    useEffect(async () =>{
        let response;
        let latitude = (vacationLocation.lat) ? (vacationLocation.lat) : 35.55 ;
        let longitude = (vacationLocation.lng) ? (vacationLocation.lng) : 97.15;
        let price = 0;

        const recommendDto = {
            latitude: latitude,
            longitude: longitude,
            price: price,
            activities: activities
        };
        await axios.post("https://bearcation-backend.herokuapp.com/location/search2", recommendDto).then(res => {
            response = res.data;
        })
        console.log("r", response);

        // await axios.get("https://bearcation-backend.herokuapp.com/location/locations")
        //     .then(res => {
        //
        //         response = res.data;
        //     })
        setLocations(response);
        //setLocations(['5', '1']); (unmounted object)
    }, [vacationLocation]);

    const navigate = useNavigate();

    const onLoad = useCallback((map) => (mapRef.current = map), [])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA3kz9oH9nUDtfo8K4xpks2-KVkP26-IKo",
        libraries: ["places"],
    });

    const searchTopPlaces = async () => {
        //const response = await fetch(`${API_URL}&s=${title}`);
        //const data = await response.json();

        //setPlaces(data); data.{}
    };

    const handlePriceChange = (event, newPrice) => {
        setPrice(newPrice);
    }

    // const parkActivites = [
    //     "Camping", "Hiking"
    // ];

    if (!isLoaded) return <div>Loading...</div>
    return (
        <div className="explore-page">
            <HeaderBar />
            <div className="explore-body">
                {(auth?.firstName) ?
                    (
                        <h1>Explore Parks, {auth.firstName}!</h1>
                    ) : (
                        <h1>Explore Parks!</h1>
                    )}
                <div className="search-form">
                    <div className="search-group form-group">
                        <NewPlaces className="search-text" setVacationLocation={(position) => {
                            setVacationLocation(position);
                            mapRef.current?.panTo(position);
                        }} />
                        {/*<div className="advanced-search-button-group">*/}
                        {/*    <Button*/}
                        {/*        className="advanced-search-button"*/}
                        {/*        variant="text"*/}
                        {/*        onClick={() => setLoadAdvancedSearch(!loadAdvancedSearch)}*/}
                        {/*    >*/}
                        {/*        Advanced Search*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                    {(
                        <div className="advanced-search-group">
                            {/*<h3>Advanced Criteria</h3>*/}
                            <div className="advanced-search-activities-group">
                                <h4>Activites</h4>
                                <Multiselect
                                    isObject={false}
                                    onRemove={(event) => {
                                        setActivities([...event]);
                                    }}
                                    onSelect={(event) => {
                                        setActivities([...event]);
                                    }}
                                    options={apiActivities}
                                />
                            </div>
                            <div className="explore-price-group">
                                <h4 className="explore-price-label">Price</h4>
                                <div className="price-slider-group">
                                    <Slider
                                        className="price-slider"
                                        value={price}
                                        min={0}
                                        step={5}
                                        max={500}
                                        onChange={handlePriceChange}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="map-group">
                        <GoogleMap
                            zoom={10}
                            center={center}
                            mapContainerClassName="map-container"
                            onLoad={onLoad}
                        >
                            {vacationLocation && (
                                <>
                                    {locations?.map((place) => (
                                        <Marker position={{lat: place.latitude, lng: place.longitude}}/>))
                                    }

                                    <Marker
                                        position={vacationLocation}
                                        icon="http://maps.google.com/mapfiles/kml/paddle/blu-circle.png"
                                    />

                                    <Circle center={vacationLocation} radius={85000} options={closeOptions} />
                                    <Circle center={vacationLocation} radius={160934} options={middleOptions} />
                                    <Circle center={vacationLocation} radius={402336} options={farOptions} />
                                    <Circle center={vacationLocation} radius={1207000} options={superFarOptions} />
                                </>
                            )}
                        </GoogleMap>
                    </div>
                    <div className="places-group">
                        <h1>Parks:</h1>
                        <div className="location-group">
                            {/* {places.map((place) => (
                            <PlaceCard place={place} />
                        ))} */}
                            {locations?.map(((place) => (
                                PlaceCard(place, navigate))))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explore;

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};

const closeOptions = {
    ...defaultOptions,
    zIndex: 4,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
};
const farOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
};
const superFarOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#CC4141",
    fillColor: "#CC4141",
};