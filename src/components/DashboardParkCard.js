import IconButton from "@material-ui/core/IconButton";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function DashboardParkCard({ park }){
    const navigate = useNavigate();
    return(
        <div className="customer-dashboard-park-card">
            <h5 className="customer-dashboard-location-text">{park.name}</h5>
            <div className="customer-dashboard-location-navigate">
                <IconButton
                    className="customer-dashboard-location-navigate-button"
                    onClick={() => {(navigate('/location', {state:{name: park.name}}))}}
                >
                    <TravelExploreIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
}