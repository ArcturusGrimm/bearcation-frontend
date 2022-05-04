import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLoadScript, Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { useLocation, useNavigate } from "react-router-dom";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import "@reach/combobox/styles.css";
import Places from "./NewPlaces";
import HeaderBar from "./HeaderBar";
import "../styles/facility.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const handleSubmit = async (e, navigate, name, description, price, id, city, state, locId) => {
    e.preventDefault();
    console.log(id);

    const locationDto = {
        id: locId,
        name: name,
        description: description,
        price: price,
        latitude: city,
        longitude: state,
    };
    let response;
    await axios.patch("https://bearcation-backend.herokuapp.com/location/editLocation", locationDto)
        .then(res => {
            console.log(res);
            response = res.data;
        });

    if (response !== "") {
        navigate("/owner-dashboard");
    } else {
        alert("Credentials do not match any account.");
    }
};

function EditLocation() {
    const location = useLocation();

    const [vacationLocation, setVacationLocation] = useState();
    const [places, setPlaces] = useState([]);
    const [loadAdvancedSearch, setLoadAdvancedSearch] = useState(false);

    const [facilityName, setFacilityName] = useState("");
    const [facilityPrice, setFacilityPrice] = useState("");
    const [facilityActivities, setFacilityActivities] = useState([]);
    const [facilityDescription, setFacilityDescription] = useState("");

    const [facilityStreetAddress, setFacilityStreetAddress] = useState("");
    const [facilityCity, setFacilityCity] = useState("");
    const [facilityState, setFacilityState] = useState("");
    const [facilityZip, setFacilityZip] = useState("");

    const { auth } = useAuth();

    const mapRef = useRef();
    const center = useMemo(() => ({ lat: 31.5489, lng: -97.1131 }), []);
    const navigate = useNavigate();

    useEffect(async () => {
        let response;
        await axios.get("https://bearcation-backend.herokuapp.com/location/search/" + location.state.id)
            .then(res => {
                console.log(res);
                response = res.data;
            });
        console.log(response);
        setFacilityName(response.name);
        setFacilityPrice(response.price);
        setFacilityDescription(response.description);
        setFacilityCity(response.latitude);
        setFacilityState(response.longitude);
    }, []);

    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA3kz9oH9nUDtfo8K4xpks2-KVkP26-IKo",
        libraries: ["places"],
    });

    const searchTopPlaces = async () => {
        //const response = await fetch(`${API_URL}&s=${title}`);
        //const data = await response.json();
        //setPlaces(data); data.{}
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="facility-page">
            <HeaderBar />
            <div className="facility-body">
                <h1>Location</h1>
                <div className="facility-form">
                    <div className="facility-group form-group">
                        <input
                            name="name"
                            className="form-control facility-name"
                            placeholder="Name..."
                            value={facilityName}
                            type="text"
                            onChange={(e) => setFacilityName(e.target.value)}
                            required
                        />

                        <input
                            name="price"
                            className="form-control facility-price"
                            placeholder="Price..."
                            value={facilityPrice}
                            type="text"
                            onChange={(e) => setFacilityPrice(e.target.value)}
                            required
                        />

                        <textarea
                            name="description"
                            className="form-control facility-description"
                            placeholder="Description..."
                            value={facilityDescription}
                            rows="6"
                            onChange={(e) => setFacilityDescription(e.target.value)}
                            required
                        />
                    </div>
                    {/*<div className="map-group">*/}
                    {/*<GoogleMap*/}
                    {/*    zoom={10}*/}
                    {/*    center={center}*/}
                    {/*    mapContainerClassName="facility-map-container"*/}
                    {/*    onLoad={onLoad}*/}
                    {/*>*/}
                    {/*    {vacationLocation && (*/}
                    {/*        <>*/}
                    {/*            <Marker*/}
                    {/*                position={vacationLocation}*/}
                    {/*                icon="http://maps.google.com/mapfiles/kml/paddle/blu-circle.png"*/}
                    {/*            />*/}

                    {/*            /!* <Circle center={vacationLocation} radius={85000} options={closeOptions} />*/}
                    {/*    <Circle center={vacationLocation} radius={160934} options={middleOptions} />*/}
                    {/*    <Circle center={vacationLocation} radius={402336} options={farOptions} />*/}
                    {/*    <Circle center={vacationLocation} radius={1207000} options={superFarOptions} /> *!/*/}
                    {/*        </>*/}
                    {/*    )}*/}
                    {/*</GoogleMap>*/}
                    {/*</div>*/}
                    <div className="facility-address-group form-group">
                        {/*<input name="street-address" className="form-control street-address-name" placeholder="Street..." value={facilityStreetAddress} type="text" onChange={e => setFacilityStreetAddress(e.target.value)} required />*/}

                        <div className="facility-inline-address">
                            <input
                                name="city"
                                className="form-control city-name"
                                placeholder="Latitude..."
                                value={facilityCity}
                                type="text"
                                onChange={(e) => setFacilityCity(e.target.value)}
                                required
                            />
                            <input
                                name="state"
                                className="form-control state-name"
                                placeholder="Longitude..."
                                value={facilityState}
                                type="text"
                                onChange={(e) => setFacilityState(e.target.value)}
                                required
                            />
                            {/*<input name="city" className="form-control city-name" placeholder="City..." value={facilityCity} type="text" onChange={e => setFacilityCity(e.target.value)} required />*/}
                            {/*<input name="state" className="form-control state-name" placeholder="State..." value={facilityState} type="text" onChange={e => setFacilityState(e.target.value)} required />*/}
                            {/*<input name="zip" className="form-control zip-number" placeholder="Zipcode..." value={facilityZip} type="text" onChange={e => setFacilityZip(e.target.value)} required />*/}
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-dark btn-block add-facility-submit"
                        value="Save Park"
                        onClick={(e) =>
                            handleSubmit(
                                e,
                                navigate,
                                facilityName,
                                facilityDescription,
                                facilityPrice,
                                auth.id,
                                facilityCity,
                                facilityState,
                                location.state.id
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
}
export default EditLocation;
