import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HeaderBar from "./HeaderBar";
import '../styles/locationPage.css'
import axios from "axios";
import { baseUrl } from "../App";

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
    const [locAtr, setLocAtr] = useState([]);
    const [locRating, setLocRating] = useState(0.0);

    useEffect(async () =>{
        let response;
        await axios.get(baseUrl + "review/search/location/" + location.state.id)
            .then(res => {
                console.log(res);
                response = res.data;
            })
        console.log(response)
        setReviews(response);

        let response2;
        await axios.get(baseUrl + "location/search/" + location.state.id)
            .then(res => {
                console.log(res);
                response2 = res.data;
            })
        console.log(response2)
        setLocAtr(response2);

        let response3;
        await axios.get(baseUrl + "review/search/location/rating/" + location.state.id)
            .then(res => {
                console.log(res);
                response3 = res.data;
            })
        console.log(response3)
        setLocRating(response3);


    }, []);

    // if(reviews.length == 0){
    //     setReviews(array);
    // }

    return (

        <div className="location-page">
            <HeaderBar />
            <div className="location-page-body">
                {/* Title */}
                <h1 className="location-name-text"><b>{locAtr.name}</b></h1>

                {/* Description */}
                <h4 className="location-description-text">
                    {locAtr.description}
                </h4>

                {/* Activites */}
                <div className="location-activities-group">
                    <h4 className="location-activities-header-text">
                        Activites:
                    </h4>
                    <h6 className="location-activities-body-text">
                        {locAtr.activities}
                    </h6>
                </div>

                {/* Price */}
                <div className="location-price-group">
                    <h4 className="location-price-text">
                        Price: ${locAtr.price}
                    </h4>
                </div>

                {/* Rating */}
                <div className="location-rating-group">
                    <h4 className="location-rating-text">
                        Rating: {locRating ? locRating : 0.0}/5
                    </h4>
                </div>

                {/* Add Review */}
                <div className="location-add-review-group">
                    <input
                        type="submit"
                        className="btn btn-dark btn-block location-add-review-submit"
                        value="Add Review"
                        onClick={e => (navigate('/review', { state: { id: location.state.id } }))}
                    />
                </div>

                {/* Display Reviews */}
                <div className="location-display-review-group">
                <h1>Reviews:</h1>
                    {
                        reviews
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
