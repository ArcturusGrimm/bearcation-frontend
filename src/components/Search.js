import React, {useCallback, useMemo, useRef, useState} from "react";
import {Circle, GoogleMap, Marker} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import '../styles/maps.css'


function Search() {
    const navigate = useNavigate();
    const [vacationLocation, setVacationLocation] = useState();
    const mapRef = useRef();
    const center = useMemo(
        () => ({ lat: 31.5489, lng: -97.1131 }),
        []
    );

    const onLoad = useCallback((map) => (mapRef.current = map), [])

    return (
        <div className="container">
            <div className="controls">
                <h1>Search</h1>
                <Places setVacationLocation={(position) => {
                    setVacationLocation(position);
                    mapRef.current?.panTo(position);
                }}/>
                <button onClick={() => navigate('/home')}>Search</button>
            </div>
            <div className="map">
                <GoogleMap
                    zoom={10}
                    center={center}
                    mapContainerClassName="map-container"
                    onLoad={onLoad}
                >
                    {vacationLocation && (
                    <>
                        <Marker position={vacationLocation} />

                        <Circle center={vacationLocation} radius={85000} options={closeOptions} />
                        <Circle center={vacationLocation} radius={160934} options={middleOptions} />
                        <Circle center={vacationLocation} radius={402336} options={farOptions} />
                        <Circle center={vacationLocation} radius={1207000} options={superFarOptions} />
                    </>
                    )}


                </GoogleMap>
            </div>
        </div>
    );
}


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


export default Search;
