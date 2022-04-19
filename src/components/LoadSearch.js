import { useState, useMemo, useCallback, useRef } from "react";
import { useEffect } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api";

import Explore from "./Explore";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA3kz9oH9nUDtfo8K4xpks2-KVkP26-IKo",
        libraries: ["places"],
    });

    if(!isLoaded) return <div>Loading...</div>
    return (<Explore />);
}

