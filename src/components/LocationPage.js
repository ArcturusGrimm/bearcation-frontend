import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HeaderBar from "./HeaderBar";
import '../styles/locationPage.css'

const AlaskaPark = {
    'name': 'Alaska National Park',
    'description': 'With millions of acres of diverse and vital wilderness and a human history reaching back 14,000 years...',
    'activities': ['Hunting', 'Fishing', 'Boating', 'Camping'],
    'price': 4.99,
    'rating': 4.8
}

function ReviewCard({review}){
    return(
        <div className="review-card">
            <h5 className="review-card-rating">Rating: {review.rating} </h5>
            <h5 className="review-card-description">Description: {review.description} </h5>
        </div>
    );
}


function LocationPage() {

    const navigate = useNavigate();
    const location = useLocation();

    let array = [{rating: 5, description: "This place is the best place ever."}, 
                {rating: 0, description: "This place sucks. BOOOOO!"}]

    const [reviews, setReviews] = useState([]);

    if(reviews.length == 0){
        setReviews(array);
    }

    return (

        <div className="location-page">
            <HeaderBar />
            <div className="location-page-body">
                {/* Title */}
                <h1 className="location-name-text"><b>{location.state.name}</b></h1>

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
                        onClick={e => (navigate('/review', { state: { name: location.state.name } }))}
                    />
                </div>

                {/* Display Reviews */}
                <div className="location-display-review-group">
                <h1>Reviews:</h1>
                    {
                        reviews.length > 0 
                        ? (
                            <div className="location-review-call-card">
                                {reviews.map((review) => <ReviewCard review={review}/>)}
                            </div>
                        ) : (
                            <div>
                                Click the button above to be the first one to review!
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default LocationPage;
