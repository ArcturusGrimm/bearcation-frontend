import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/reviewPage.css';
import {useLocation} from 'react-router-dom';
import axios from "axios";

const AlaskaPark = {
    'name': 'Alaska National Park',
    'description': 'With millions of acres of diverse and vital wilderness and a human history reaching back 14,000 years...',
    'activities': ['Hunting', 'Fishing', 'Boating', 'Camping'],
    'price': 4.99,
    'rating': 4.8
}
const handlePostSubmit = async(e, navigate, rating, review, parkName) => {
    e.preventDefault();
    const reviewDto = {
        locationName: parkName,
        rating: rating,
        description: review
    };
    let response;
    // await axios.post("https://bearcation-backend.herokuapp.com/review/createReview", reviewDto)
    //     .then(res => {
    //         console.log(res);
    //         response = res.data;
    //     })
    if(response !== ""){
        navigate('/customer-dashboard', {state:{fName: "Francis"}})

    }else{
        alert("Credentials do not match any account.")
    }
}
const handleCancelSubmit = async(e, navigate) => {
    navigate('/customer-dashboard', {state:{fName: "Francis"}})
}

function ReviewPage () {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.name);
    return(
        <div className="review-page-body">
            {/* Title */}

            <h3 className="review-name-text">Review {location.state.name}</h3>

            {/* Rating */}
            <div className="review-rating-group">
                <input name = "rating"
                       className="form-control review-rating-text"
                       placeholder="Rating..."
                       value={rating}
                       type="text"
                       onChange={e => setRating(e.target.value)}
                />
            </div>

            {/* Review */}
            <div className="review-review-group">
                <textarea
                    name="review-description"
                    className="form-control review-description"
                    placeholder="Review..."
                    value={review}
                    rows="6"
                    onChange={e => setReview(e.target.value)}
                />
            </div>

            <div className="review-button-group">
                <input type="submit"
                       className="btn btn-dark btn-block review-post-review-submit"
                       value="Post"
                       onClick={e => handlePostSubmit(e, navigate, rating, review, location.state.name)}
                />
                <input type="submit"
                       className="btn btn-dark btn-block review-cancel-review-submit"
                       value="Cancel"
                       onClick={e => handleCancelSubmit(e, navigate)}
                />
            </div>
        </div>
    );
}

export default ReviewPage;