import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/reviewPage.css";
import { useLocation } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { baseUrl } from "../App";

const handlePostSubmit = async (e, navigate, auth, rating, review, id) => {
    e.preventDefault();

    
    if (rating.length == 0 || isNaN(rating) || rating < 0 || rating > 5){
        alert("Enter a rating from 0 to 5.")
        return;
    }
    if (review.length == 0){
        alert("Please add a description.");
        return;
    }
    if (review.length > 255){
        alert("The review is too long. Please limit to 255 characters.");
        return;
    }

    const reviewDto = {
        locationId: id,
        ownerId: auth.id,
        rating: rating,
        description: review,
    };
    let response;
    await axios.post(baseUrl + "review/createReview", reviewDto)
        .then(res => {
            console.log(res);
            response = res.data;
        });
    if (response !== "") {
        navigate(-1);
    } else {
        alert("Credentials do not match any account.");
    }
};
const handleCancelSubmit = async (e, navigate) => {
    navigate(-1);
};

function ReviewPage() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const { auth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.name);
    return (
        <div className="review-page">
            <HeaderBar />
            <div className="review-page-body">
                {/* Title */}

                <h3 className="review-name-text">Review {location.state.name}</h3>

                {/* Rating */}
                <div className="review-rating-group">
                    <input
                        name="rating"
                        className="form-control review-rating-text"
                        placeholder="Rating..."
                        value={rating}
                        type="text"
                        onChange={(e) => setRating(e.target.value)}
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
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>

                <div className="review-button-group">
                    <input
                        type="submit"
                        className="btn btn-dark btn-block review-post-review-submit"
                        value="Post"
                        onClick={(e) =>
                            handlePostSubmit(e, navigate, auth, rating, review, location.state.id)
                        }
                    />
                    <input
                        type="submit"
                        className="btn btn-dark btn-block review-cancel-review-submit"
                        value="Cancel"
                        onClick={(e) => handleCancelSubmit(e, navigate)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReviewPage;
