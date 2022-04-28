import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {useLocation, useNavigate} from "react-router-dom";

import '../styles/locationPage.css'

const AlaskaPark = {
    'name': 'Alaska National Park', 
    'description': 'With millions of acres of diverse and vital wilderness and a human history reaching back 14,000 years...',
    'activities': ['Hunting', 'Fishing', 'Boating', 'Camping'],
    'price': 4.99,
    'rating': 4.8
}


function LocationPage () {

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className="location-page-body">
            {/* Title */}
            <h3 className="location-name-text">{location.state.name}</h3>

            {/* Description */}
            <h6 className="location-description-text">
                With millions of acres of diverse and vital wilderness and a human history reaching back 14,000 years, 
                the enormity of Alaska’s story is almost incomprehensible. Within this vast landscape, 
                Alaska’s many national parks, preserves, monuments and national historical parks are home to a host of 
                natural, cultural, and historic wonders. Alaska, the Land of the Midnight Sun, has the nation's largest 
                glacial system, world-class wildlife viewing, North America's tallest peak, and so much more.
            </h6>

            {/* Activites */}
            <div className="location-activities-group">
                <h4 className="location-activities-header-text">
                    Activites:
                </h4>
                <h6 className="location-activities-body-text">
                    {AlaskaPark.activities}
                </h6>
            </div>

            {/* Price */}
            <div className="location-price-group">
                <h4 className="location-price-text">
                    Price: ${AlaskaPark.price}
                </h4>
            </div>

            {/* Rating */}
            <div className="location-rating-group">
                <h4 className="location-rating-text">
                    Rating: {AlaskaPark.rating}/5
                </h4>
            </div>

            {/* Add Review */}
            <div className="location-add-review-group">
                <input 
                    type="submit" 
                    className="btn btn-dark btn-block location-add-review-submit" 
                    value="Add Review" 
                    onClick={e=>(navigate('/review', {state:{name: location.state.name}}))}
                />
            </div>
        </div>
    );
}

export default LocationPage;
